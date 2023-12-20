import React, {useRef, useState} from 'react';
import styles from './Chat.module.css';
import UserImage from '../../../Utils/UserImage/UserImage';
import {useDispatch} from 'react-redux';
import OnlineStatusIndicator from '../../../Utils/OnlineStatusIndicator/OnlineStatusIndicator';
import {deleteUserChat, setActiveChat} from "../../../actions/messagesActions";
import useCurrentUser from "../../../customHooks/useCurrentUser";
import useEventListener from "../../../customHooks/useElementListener";

const Chat = ({chatData, handleChatClick, isOnline}) => {
    const dispatch = useDispatch()
    const menuRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {currentUserId} = useCurrentUser()
    const {chatId, username, profileImage, isPersonal} = chatData;
    const lastMessage = chatData.lastMessage || {};
    const {senderId, text} = lastMessage;
    const isCurrentUser = currentUserId === senderId;

    const clickFunc = (e) => {
        e.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setIsMenuOpen(false);
        }
    };
    useEventListener('click', closeMenu);
    const deleteChat = async () => {
        try {
            setLoading(true);
            await dispatch(deleteUserChat(chatId));
            dispatch(setActiveChat(null))
            setLoading(false);
        } catch (error) {
            console.error("Ошибка при удалении чата:", error);
            setLoading(false);
        }
    };

    return (
        <button className={styles.chatContainer} onClick={() => handleChatClick(chatData, isOnline)}>
            <div className={styles.container_image}>
                <UserImage imageName={profileImage} alt="person_chat" className={styles.image}/>
                {!isPersonal && <OnlineStatusIndicator isOnline={isOnline}/>}
            </div>
            <div className={styles.textContainer} title={text}>
                <div className={styles.username}>{`${!isPersonal ? username : 'Favourites'}`}</div>
                {text ? (
                    <div
                        className={styles.lastMessage}>{!isPersonal && `${isCurrentUser ? 'You: ' : `${username}: `} ${text}`}</div>
                ) : (
                    ''
                )}
            </div>
            {!isPersonal && (
                <div className={styles.container_dots} onClick={clickFunc}>
                    <div className={styles.iconsContainer}>
                        <div className={styles.dots}></div>
                        {isMenuOpen && (
                            <ul ref={menuRef} className={styles.menuList}>
                                <li onClick={loading ? null : deleteChat} className={loading ? styles.disabled : ''}>
                                    Delete Chat
                                    {loading && <span className={styles.loadingIcon}>⛔</span>}
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </button>
    );
};

export default Chat;
