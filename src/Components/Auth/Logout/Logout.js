import React from 'react';
import styles from './Logout.module.css'
import {useNavigate} from 'react-router-dom';
import {authAPI} from "../../../api/api";
import {useDispatch} from "react-redux";
import {logoutUser, setAuthStatus} from "../../../actions/usersActions";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Получите диспетчер Redux
    const token = localStorage.getItem('token')

    async function handleLogout() {
        try {
            // Выполняем запрос на сервер для выхода
            await authAPI.logout();
            // Удаляем локальные данные аутентификации на клиенте
            localStorage.removeItem('token');
            localStorage.removeItem('expiresIn');
            dispatch(logoutUser());
            dispatch(setAuthStatus(false))
            // Перенаправляем пользователя на страницу входа или куда угодно еще
            navigate('/login');
            // Перезагружаем страницу
            window.location.reload();
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    }

    return (<div className={styles.logoutPage}>
            <div className={styles.logoutContainer}>
                <div className={styles.icon}>
                    {/* Ваша иконка здесь */}
                </div>
                <div className={styles.text}>
                    <p>Are you sure you want to log out?</p>
                </div>
                {token && (
                    <button onClick={handleLogout} className={styles.button}>
                        Log out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Logout;
