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
            navigate('/login'); // Предполагается, что у вас есть navigate из React Router
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    }

    return (
        <div className={styles.container_logout}>
            {token ? <button onClick={handleLogout} className={styles.button}>
                    <span className={styles.initial_text}>You want out?</span>
                    <span className={styles.hover_text}>Exit</span>
                </button>
                : ''}
        </div>
    );
};

export default Logout;
