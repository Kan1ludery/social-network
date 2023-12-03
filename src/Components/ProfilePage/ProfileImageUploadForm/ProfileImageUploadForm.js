import React from 'react';
import styles from './ProfileImageUploadForm.module.css';
import UserImage from '../../../Utils/UserImage/UserImage';
import {uploadImage} from "../../../actions/usersActions";

const ProfileImageUploadForm = ({ dispatch, imageName, isCurrentUser }) => {
    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append('image', values);
        try {
            dispatch(uploadImage(formData))
        } catch (error) {
            console.error('Произошла ошибка при отправке файла', error);
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleSubmit(file);
        }
        else {
            alert("Вы отменили выбор файла.");
        }
    };
    return (
        <div align={'center'}>
            <label htmlFor="image" className={styles.label_text}>
                <UserImage imageName={imageName} alt="profile_photo" className={`${isCurrentUser ? styles.profile_image : styles.profile_image_other}`}/>
                <img src="/assets/icons/search/photo.svg" alt="Search Icon" className={`${isCurrentUser ? styles.icon : styles.otherIcon}`}/>
            </label>
            <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                style={{display: 'none'}} // Скрываем инпут с помощью CSS, но он остается в макете
                disabled={!isCurrentUser}
            />
        </div>
    );
};

export default ProfileImageUploadForm;
