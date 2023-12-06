import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfoFromToken from '../Utils/Functions/getUserInfoFromToken';
import {isAuthenticated} from "../api/apiUtils";

const withEmailConfirmation = (WrappedComponent) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const isAuth = isAuthenticated();
            if (isAuth) {
                const { emailVerified } = getUserInfoFromToken(); // Получение emailVerified из токена

                // Проверка подтверждения email при монтировании компонента
                if (!emailVerified) {
                    navigate('/emailConfirm');
                }
            }
        }, [navigate]);

        // Возвращаем обернутый компонент
        return <WrappedComponent {...props} />;
    };
};

export default withEmailConfirmation;
