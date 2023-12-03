import React from 'react';

const UserImage = ({ imageName, alt, className }) => {
    // Формируем URL из базовой части и переданного имени изображения
    const imageUrl = imageName
        ? `http://localhost:3001/api/uploads/${imageName}`
        : '../assets/img/profile/personImage.svg'; // URL к заглушке
    return (
        <img src={imageUrl} alt={alt} className={className} />
    );
};

export default UserImage;
