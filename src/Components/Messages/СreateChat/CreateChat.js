import React, {useEffect, useState} from 'react';
import styles from "./CreateChat.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getChattedUsers, getRandomUsersInfo} from "../../../actions/usersActions";
import UserImage from "../../../Utils/UserImage/UserImage";
import {fetchChatList, setActiveChat, updateSearchModal} from "../../../actions/messagesActions";
import {generateUID} from "../../../Utils/Functions/generateUID";
import ModalOverlay from "../../../Utils/ModalOverlay/ModalOverlay";
import {messagesAPI} from "../../../api/api";

const CreateChat = ({onlineUsers, isSearchModalOpen}) => {
    const dispatch = useDispatch()
    const {randomUsers, chattedUsers} = useSelector((state) => state.userReducer)
    const [activeTab, setActiveTab] = useState('random');
    const openTab = (tabName) => {
        setActiveTab(tabName);
    };
    const handleCreateChat = (targetId, profile, username) => {
        const chatId = generateUID()
        const messages = []
        const profileImage = profile.profileImage
        const status = onlineUsers.includes(targetId)
        dispatch(setActiveChat(chatId, messages, username, profileImage, status, targetId)); // Здесь createChatAction должно быть ваше действие
        dispatch(updateSearchModal(false))
    };
    const handleJoinChat = async (chatId, otherUserId) => {
        await messagesAPI.restoreAccessToChat(chatId, otherUserId)
        await dispatch(fetchChatList())
        dispatch(updateSearchModal(false))
        dispatch(setActiveChat(null))
    }
    useEffect(() => {
        const fetchData = async () => {
            if (activeTab === 'random') {
                dispatch(getRandomUsersInfo());
            }
            if (activeTab === 'chats') {
                dispatch(getChattedUsers())
            }
        };
        fetchData();
    }, [dispatch, activeTab])
    return (
        <ModalOverlay onClose={() => dispatch(updateSearchModal(false))} isOpen={isSearchModalOpen}>
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'random' ? `${styles.tab} ${styles.active}` : styles.tab}
                    onClick={() => openTab('random')}>
                    Users you can chat
                </button>
                <button
                    className={activeTab === 'chats' ? `${styles.tab} ${styles.active}` : styles.tab}
                    onClick={() => openTab('chats')}>
                    Chatted users
                </button>
            </div>
            <div className={styles.tabContent} style={{display: activeTab === 'random' ? 'block' : 'none'}}>
                {/* Содержимое для рандомных пользователей */}
                {randomUsers.length > 0 ? (
                    randomUsers.map((user) => (
                        <div key={user._id} className={styles.user}>
                            <UserImage className={styles.avatar} imageName={user.profile.profileImage} clickable={true}
                                       to={`/profile/${user.username}`}/>
                            {user.username}
                            <button onClick={() => handleCreateChat(user._id, user.profile, user.username)}
                                    className={styles.buttonCreate}>
                                Create a chat
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={styles.noSearch}>No users available</div>
                )}
            </div>
            <div className={styles.tabContent} style={{display: activeTab === 'chats' ? 'block' : 'none'}}>
                {chattedUsers.length > 0 ? (
                    chattedUsers.map((user) => (
                        <div key={user._id} className={styles.user}>
                            <UserImage className={styles.avatar} imageName={user.profile.profileImage} clickable={true}
                                       to={`/profile/${user.username}`}/>
                            {user.username}
                            <button onClick={()=> handleJoinChat(user.chatId, user._id)}
                                    className={styles.buttonCreate}>
                                Join chat
                            </button>
                        </div>
                    ))
                ) : (
                    <div className={styles.noSearch}>No users available</div>
                )}
                {/* Контейнер для моих чатов */}
                {/* Ваш код для хранения пользователей, с которыми есть чат */}
            </div>
        </ModalOverlay>
    );
};

export default CreateChat;