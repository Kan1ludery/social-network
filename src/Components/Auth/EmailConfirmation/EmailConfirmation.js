import React, {useEffect, useState} from 'react';
import {usersAPI} from "../../../api/api";
import getUserInfoFromToken from "../../../Utils/Functions/getUserInfoFromToken";
import styles from './EmailConfirmation.module.css';
import io from 'socket.io-client';
import {updateToken} from "../../../actions/usersActions";
import {useDispatch} from "react-redux";

const EmailConfirmation = () => {
    const dispatch = useDispatch(); // Инициализация хука useDispatch
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [loading, setLoading] = useState(false); // Состояние для отслеживания загрузки
    const { userId } = getUserInfoFromToken();
    useEffect(() => {
        const socket = io('http://localhost:3001');

        socket.on('emailVerified', (data) => {
            console.log('Получены новые данные:')
            const {newToken} = data
            console.log(newToken)
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
            const response = await usersAPI.resendVerificationEmail(userId);
            setConfirmationMessage(response);
        } catch (error) {
            console.error('Ошибка при повторной отправке письма:', error);
            setConfirmationMessage('Ошибка при отправке письма');
        } finally {
            setLoading(false); // В любом случае сбрасываем состояние загрузки после запроса
        }
    };

    return (
        <div className={styles.back}>
            <div className={styles.container}>
                <h2 className={styles.title}>Подтверждение почты</h2>
                <p className={styles.instructions}>
                    Нажмите кнопку ниже, чтобы повторно отправить письмо для подтверждения вашей почты.
                </p>
                <p className={styles.message}>{confirmationMessage}</p>
                <button className={styles.button} onClick={resendVerificationEmail} disabled={loading}>
                    {loading ? 'Отправка...' : 'Отправить письмо еще раз'}
                </button>
            </div>
        </div>
    );
};

export default EmailConfirmation;
