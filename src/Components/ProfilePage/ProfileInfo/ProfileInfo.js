import React from 'react';
import styles from './ProfileInfo.module.css'
import ProfileImageUploadForm from "../ProfileImageUploadForm/ProfileImageUploadForm";
import SocialIcons from "../SocialIcons/SocialIcons";
import ProfileDescription from "../ProfileDescription/ProfileDescription";

const ProfileInfo = ({isCurrentUser, dispatch, otherUsername, user, profile, email, isLoading, errorMessage}) => {
    return (<div className={styles.container_info}>

            {/** Смена фотографии (форма) */}
            <ProfileImageUploadForm dispatch={dispatch} imageName={`${isCurrentUser ? user.profile.profileImage : profile.profileImage}`}
                                    isCurrentUser={isCurrentUser}/>
            <div className={styles.container_profileContent}>
                <div className={styles.userInfo}>
                    <span className={styles.username}>{otherUsername}</span>
                    <span className={styles.email}>{email}</span>
                </div>
                {/** Ссылки на соц. сети */}
                <SocialIcons socialLinks={profile.socialLinks} isLoading={isLoading} errorMessage={errorMessage}
                             isCurrentUser={isCurrentUser} profile={profile}/>
                <hr/>
                {/** Описание пользователя */}
                <ProfileDescription profile={profile} dispatch={dispatch} isLoading={isLoading}
                                    errorMessage={errorMessage} isCurrentUser={isCurrentUser}/>
            </div>

    </div>);
};

export default ProfileInfo;