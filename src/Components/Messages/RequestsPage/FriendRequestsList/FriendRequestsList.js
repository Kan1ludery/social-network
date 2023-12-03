import React from 'react';
import {acceptFriend, fetchChatList, rejectFriend} from "../../../../actions/messagesActions";
import {useDispatch} from "react-redux";
import styles from './FriendRequests.module.css'
import UserImage from "../../../../Utils/UserImage/UserImage";

const FriendRequestsList = ({usersRequestList}) => {
    const {usersRequests = []} = usersRequestList
    console.log(usersRequests)
    const dispatch = useDispatch()
    const accept = async (friendId) => {
        dispatch(acceptFriend(friendId))
        dispatch(fetchChatList());
    }
    const reject = async (friendId) => {
        dispatch(rejectFriend(friendId))
        dispatch(fetchChatList());
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
                                <UserImage imageName={request.profile.profileImage} className={styles.image} alt={'req_img'} />
                                <div>
                                    <span className={styles.center}>От: {request.username}</span>
                                    <div className={styles.requestButtons}>
                                        <button className={styles.acceptButton} onClick={() => accept(request._id)}>Принять</button>
                                        <button className={styles.rejectButton} onClick={() => reject(request._id)}>Отказаться</button>
                                    </div>
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