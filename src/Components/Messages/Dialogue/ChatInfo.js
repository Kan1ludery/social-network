import React from 'react';
import styles from "./ChatInfo.module.css";
import UserImage from "../../../Utils/UserImage/UserImage";

const ChatInfo = ({chatData}) => {
    return (
        <div className={styles.container_info_chat}>
            <div className={styles.info_chat}>
                <UserImage imageName={chatData.profileImage} alt="same_man" className={styles.image} />
                <div className={styles.username}>{chatData.username}</div>
                <div>{chatData.currentStatus ? 'online' : 'offline'}</div>
            </div>
            <div className={styles.container_button}>
                <button className={styles.search}></button>
                <button className={styles.dots}></button>
            </div>
        </div>
    );
};

export default ChatInfo;