import React from 'react';
import {acceptFriend, fetchChatList, rejectFriend} from "../../../../actions/messagesActions";
import {useDispatch} from "react-redux";
import styles from './FriendRequests.module.css'
import UserImage from "../../../../Utils/UserImage/UserImage";

const FriendRequestsList = ({usersRequestList}) => {
    const {usersRequests = []} = usersRequestList
    const dispatch = useDispatch()
    const accept = async (friendId) => {
        await dispatch(acceptFriend(friendId))
        await dispatch(fetchChatList());
    }
    const reject = async (friendId) => {
        await dispatch(rejectFriend(friendId))
        await dispatch(fetchChatList());
    }
    return (
        <div className={styles.friendRequestsList}>
            <ul>
                {usersRequests.length === 0 ? (
                    <div className={styles.center}>There are no requests yet</div>
                ) : (
                    usersRequests.map((request) => (
                        <li key={request._id}>
                            <div className={styles.requestInfo}>
                                <UserImage imageName={request.profile.profileImage} className={styles.image} alt={'req_img'} clickable={true} to={`/profile/${request.username}`}/>
                                <span className={styles.center}>{request.username}</span>
                                <div className={styles.requestButtons}>
                                    <button className={styles.acceptButton} onClick={() => accept(request._id)}></button>
                                    <button className={styles.rejectButton} onClick={() => reject(request._id)}></button>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default FriendRequestsList;