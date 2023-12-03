import React from 'react';
import styles from './Message.module.css';
import UserImage from "../../../Utils/UserImage/UserImage";
import {useSelector} from "react-redux";
import {formatTimeToHoursMinutes} from "../../../Utils/formatTimeToHoursMinutes/formatTimeToHoursMinutes";

const Message = ({message, profileImage}) => {
    const {_id: currentUserId, profile} = useSelector((state) => state.userReducer.user);
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
                ? <UserImage className={styles.circle} alt={'message_person'} imageName={profile.profileImage} />
                : <UserImage className={styles.circle} alt={'message_person'} imageName={profileImage} />
            }
            <div className={styles.contentContainer}>{text}</div>
            <div className={styles.time}>{formattedTime}</div>
        </div>
    );
};

export default Message;
