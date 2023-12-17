import React from 'react';
import {NavLink} from "react-router-dom";
import {baseServerURL} from "../../api/api";

const UserImage = ({imageName, alt = 'no_image', className, clickable = false, to = '/'}) => {
    // Формируем URL из базовой части и переданного имени изображения
    const imageUrl = imageName
        ? `${baseServerURL}/api/uploads/${imageName}`
        : '../assets/img/profile/personImage.svg'; // URL к заглушке
    if (clickable) {
        return (
            <NavLink to={to}>
                <img src={imageUrl} alt={alt} className={className}/>
            </NavLink>
        );
    }
    return (
        <img src={imageUrl} alt={alt} className={className}/>
    );
};

export default UserImage;
