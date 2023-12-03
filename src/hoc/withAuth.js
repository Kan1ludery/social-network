import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
    return (props) => {
        const token = localStorage.getItem('token');
        const navigate = useNavigate();

        useEffect(() => {
            if (!token && window.location.pathname !== '/register') {
                // Если токен отсутствует, перенаправляем на маршрут входа по умолчанию
                navigate('/login');
            }
        }, [token, navigate]);

        // Рендерим обернутый компонент
        return <Component {...props} />;
    };
};

export default withAuth;