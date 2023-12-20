import React from 'react';
import {NavLink} from "react-router-dom";
import {baseServerURL} from "../../api/api";

const UserImage = ({imageName, alt = 'no_image', className, clickable = false, to = '/'}) => {
    // Формируем URL из базовой части и переданного имени изображения
    const imageUrl = imageName
        ? `${baseServerURL}/api/uploads/${imageName}`
        : '../assets/img/profile/personImage.svg'; // URL к заглушке
    const handleImageError = (e) => {
        e.target.onerror = null; // Отменяем обработчик, чтобы избежать бесконечных циклов ошибок
        e.target.src = '../assets/img/profile/personImage.svg'; // Загружаем заглушку при ошибке
    };
    if (clickable) {
        return (
            <NavLink to={to}>
                <img
                    src={imageUrl}
                    alt={alt}
                    className={className}
                    onError={handleImageError}
                />
            </NavLink>
        );
    }
    return (
        <img
            src={imageUrl}
            alt={alt}
            className={className}
            onError={handleImageError}
        />
    );
};

export default UserImage;
