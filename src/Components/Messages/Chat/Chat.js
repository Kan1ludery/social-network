import React, {useState} from 'react';
import styles from './Chat.module.css';
import UserImage from '../../../Utils/UserImage/UserImage';
import {useDispatch, useSelector} from 'react-redux';
import OnlineStatusIndicator from '../../../Utils/OnlineStatusIndicator/OnlineStatusIndicator';
import {deleteUserChat} from "../../../actions/messagesActions";

const Chat = ({ chatData, handleChatClick, isOnline }) => {
    const dispatch = useDispatch()
    const { chatId, username, profileImage, isPersonal} = chatData;
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
                {!isPersonal && <OnlineStatusIndicator isOnline={isOnline} />}
            </div>
            <div className={styles.textContainer} title={text}>
                <div className={styles.username}>{`${!isPersonal ? username : 'Personal chat'}`}</div>
                {text ? (
                    <div className={styles.lastMessage}>{!isPersonal && `${isCurrentUser ? 'You: ' : `${username}: `} ${text}`}</div>
                ) : (
                    ''
                )}
            </div>
            {!isPersonal && (
                <div className={styles.container_dots} onClick={clickFunc}>
                    <div className={styles.iconsContainer}>
                        <div className={styles.dots}></div>
                        {isMenuOpen && (
                            <ul className={styles.menuList}>
                                <li onClick={deleteChat}>Delete Chat</li>
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </button>
    );
};

export default Chat;
