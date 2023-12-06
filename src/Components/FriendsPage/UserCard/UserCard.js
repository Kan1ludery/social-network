import React from 'react';
import styles from './UserCard.module.css';
import UserImage from "../../../Utils/UserImage/UserImage";
import OnlineStatusIndicator from "../../../Utils/OnlineStatusIndicator/OnlineStatusIndicator";

const UserCard = ({ user, isFriend, onToggleFriendship, isOnline }) => {
    return (
        <div className={styles.userCard}>
            <UserImage imageName={user.profile.profileImage} className={styles.avatar}/>
            <h3 className={styles.userName}>{user.username}</h3>
            <div className={styles.actionButtons}>
                {!isFriend ? (
                    <button onClick={() => onToggleFriendship(user._id, false)} className={styles.removeButton}>
                        Удалить из друзей
                    </button>
                ) : (
                    <button onClick={() => onToggleFriendship(user._id, true)} className={styles.addButton}>
                        Добавить в друзья
                    </button>
                )}
                <OnlineStatusIndicator isOnline={isOnline} />
            </div>

        </div>
    );
};

export default UserCard;
