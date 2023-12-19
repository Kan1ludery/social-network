import React, {useState} from 'react';
import styles from './UserCard.module.css';
import UserImage from "../../../Utils/UserImage/UserImage";
import OnlineStatusIndicator from "../../../Utils/OnlineStatusIndicator/OnlineStatusIndicator";
import {deleteFriend, setFriendsCount} from "../../../actions/usersActions";
import {messagesAPI} from "../../../api/api";

const UserCard = ({otherUser, user, isOnline, dispatch, friendsCount}) => {
    const [loading, setLoading] = useState(false)
    const onToggleFriendship = async (userId, friendId) => {
        try {
            setLoading(true)
            await messagesAPI.deleteFriendship(userId, friendId)
            dispatch(deleteFriend(friendId));
            dispatch(setFriendsCount(friendsCount - 1))
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
    return (<div className={styles.userCard}>
        <div className={styles.relative}>
            <UserImage imageName={otherUser.profile.profileImage} className={styles.avatar} clickable={true}
                       to={`/profile/${otherUser.username}`}/>
            <OnlineStatusIndicator isOnline={isOnline}/>
        </div>
        <h3 className={styles.userName}>{otherUser.username}</h3>
        <div className={styles.actionButtons}>
            <button onClick={() => onToggleFriendship(user._id, otherUser._id)} className={styles.removeButton}
                    disabled={loading}>
                {loading ? <p>Удаление из друзей...</p> : <p>Удалить из друзей</p>}
            </button>
        </div>

    </div>);
};

export default UserCard;
