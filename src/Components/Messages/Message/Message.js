import React from 'react';
import styles from './Message.module.css';
import UserImage from "../../../Utils/UserImage/UserImage";
import {formatTimeToHoursMinutes} from "../../../Utils/formatTimeToHoursMinutes/formatTimeToHoursMinutes";
import useCurrentUser from "../../../customHooks/useCurrentUser";

const Message = ({message, profileImage, otherUsername}) => {
    const {currentUserId, username, profile} = useCurrentUser()
    const {text, senderId, timestamp} = message
    // Форматируем время сообщения
    const formattedTime = formatTimeToHoursMinutes(new Date(timestamp));
    // Определяем, является ли сообщение отправленным текущим пользователем
    const isCurrentUser = currentUserId === senderId;
    const messageContainerClass = isCurrentUser
        ? `${styles.messageContainer} ${styles.currentUserMessage}`
        : `${styles.messageContainer} ${styles.otherUserMessage}`;
    return (
        <div className={messageContainerClass}>
            {isCurrentUser
                ? <UserImage className={styles.circle} alt={'message_person'} imageName={profile.profileImage} clickable={true} to={`/profile/${username}`}/>
                : <UserImage className={styles.circle} alt={'message_person'} imageName={profileImage} clickable={true} to={`/profile/${otherUsername}`}/>
            }
            <div className={styles.contentContainer}>{text}</div>
            <div className={styles.time}>{formattedTime}</div>
        </div>
    );
};

export default Message;
