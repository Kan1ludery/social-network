import React, {useEffect, useState} from 'react';
import getUserInfoFromToken from "../../../Utils/Functions/getUserInfoFromToken";
import styles from './EmailConfirmation.module.css';
import io from 'socket.io-client';
import {resendEmailVerification, updateToken} from "../../../actions/usersActions";
import {useDispatch, useSelector} from "react-redux";
import {baseServerURL} from "../../../api/api";

const EmailConfirmation = () => {
    const dispatch = useDispatch(); // Инициализация хука useDispatch
    const {confirmationMessage} = useSelector(state => state.userReducer)
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
    const {userId} = getUserInfoFromToken();
    useEffect(() => {
        const socket = io(`${baseServerURL}/socketIO1`);

        socket.on('emailVerified', (data) => {
            const {newToken} = data
            dispatch(updateToken(newToken)); // Диспатч нового токена в Redux Store
            localStorage.setItem('token', newToken)
            // Дополнительные действия при получении события
        });

        return () => {
            socket.disconnect(); // Отключение сокета при размонтировании компонента
        };
    }, [dispatch, userId]);
    const resendVerificationEmail = async () => {
        try {
            setLoading(true); // Устанавливаем состояние загрузки в true при начале запроса
            await dispatch(resendEmailVerification(userId))
        } catch (error) {
            console.error('Ошибка при повторной отправке письма:', error);
        } finally {
            setLoading(false); // В любом случае сбрасываем состояние загрузки после запроса
        }
    };

    return (<div className={styles.back}>
            <div className={styles.container}>
                <h2 className={styles.title}>Подтверждение почты</h2>
                <p className={styles.instructions}>
                    Для завершения процесса подтверждения почты, пожалуйста, перейдите по ссылке, которая была
                    отправлена на вашу почту при регистрации.
                </p>
                <p className={styles.instructions}>
                    После подтверждения почты, вас автоматически перенаправит на главную страницу.
                </p>
                <p className={styles.message}>{confirmationMessage}</p>
                <button className={styles.button} onClick={resendVerificationEmail} disabled={loading}>
                    {loading ? 'Отправка...' : 'Отправить письмо еще раз'}
                </button>
                <p className={styles.underText}>Письмо не пришло? Отправьте его еще раз.</p>
            </div>
        </div>

    );
};

export default EmailConfirmation;
