import React, { useState } from 'react';
import styles from './Chat.module.css';
import UserImage from '../../../Utils/UserImage/UserImage';
import {useDispatch, useSelector} from 'react-redux';
import OnlineStatusIndicator from '../../../Utils/OnlineStatusIndicator/OnlineStatusIndicator';
import {deleteUserChat} from "../../../actions/messagesActions";

const Chat = ({ chatData, handleChatClick, isOnline }) => {
    const dispatch = useDispatch()
    const { chatId, username, profileImage } = chatData;
    const lastMessage = chatData.lastMessage || {};
    const { senderId, text } = lastMessage;
    const { _id: currentUserId } = useSelector((state) => state.userReducer.user);
    const isCurrentUser = currentUserId === senderId;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const clickFunc = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };
    const deleteChat = () => {
        console.log(chatId)
        dispatch(deleteUserChat(chatId))
    }
    return (
        <button className={styles.chatContainer} onClick={() => handleChatClick(chatData, isOnline)}>
            <div className={styles.container_image}>
                <UserImage imageName={profileImage} alt="person_chat" className={styles.image} />
                <OnlineStatusIndicator isOnline={isOnline} />
            </div>
            <div className={styles.textContainer} title={text}>
                <div className={styles.username}>{username}</div>
                {text ? (
                    <div className={styles.lastMessage}>{isCurrentUser ? 'You: ' : `${username}: `}{text}</div>
                ) : (
                    ''
                )}
            </div>
            <div className={styles.container_dots} onClick={clickFunc}>
                {/* Используем тернарный оператор для отображения разных иконок */}
                <div className={styles.iconsContainer}>

                    <div className={styles.dots}></div>
                    {isMenuOpen && (
                        <ul className={styles.menuList}>
                            <li onClick={deleteChat}>Delete Chat</li>
                            {/* Добавь другие пункты меню по необходимости */}
                        </ul>
                    )}
                </div>
            </div>
        </button>
    );
};

export default Chat;
