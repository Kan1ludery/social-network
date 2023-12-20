import React from 'react';
import styles from "./ChatInfo.module.css";
import UserImage from "../../../Utils/UserImage/UserImage";
import useCurrentUser from "../../../customHooks/useCurrentUser";

const ChatInfo = ({chatData, onlineUsers}) => {
    const {currentUserId} = useCurrentUser()
    return (
        <div className={styles.container_info_chat}>
            <div className={styles.info_chat}>
                <UserImage imageName={chatData.profileImage} alt="same_man" className={styles.image} clickable={true} to={`/profile/${chatData.username}`}/>
                <div className={styles.username}>{chatData.username}</div>
                <div>{chatData.targetId !== currentUserId ?
                    onlineUsers.includes(chatData.targetId) ? 'online' : 'offline'
                    : ''}
                </div>
            </div>
            {/** dev */}
            {/*<div className={styles.container_button}>*/}
            {/*    <button className={styles.search}></button>*/}
            {/*    <button className={styles.dots}></button>*/}
            {/*</div>*/}
        </div>
    );
};

export default ChatInfo;