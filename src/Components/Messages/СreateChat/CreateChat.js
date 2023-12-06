import React, {useEffect} from 'react';
import styles from "./CreateChat.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getRandomUsersInfo} from "../../../actions/usersActions";
import UserImage from "../../../Utils/UserImage/UserImage";
import {setActiveChat} from "../../../actions/messagesActions";
import {generateUID} from "../../../Utils/Functions/generateUID";

const CreateChat = ({closeOverlay, onlineUsers}) => {
    const dispatch = useDispatch()
    const {randomUsers} = useSelector((state) => state.userReducer)

    const handleCreateChat = (targetId, profile, username) => {
        const chatId = generateUID()
        const messages = []
        const profileImage = profile.profileImage
        const status = onlineUsers.includes(targetId)

        dispatch(setActiveChat(chatId, messages, username, profileImage, status, targetId)); // Здесь createChatAction должно быть ваше действие
        closeOverlay()
    };
    useEffect(() => {
        dispatch(getRandomUsersInfo())
    }, [dispatch])
    return (
        <div className={styles.overlay} onClick={closeOverlay}>
            <div className={styles.search_modal} onClick={(e) => e.stopPropagation()}>
                Это может быть формой
                {randomUsers.map((user) => <div key={user._id}>
                        <UserImage className={styles.avatar} imageName={user.profile.profileImage}/>
                        {user.username}
                        {/* Кнопка для создания чата */}
                        <button onClick={() => handleCreateChat(user._id, user.profile, user.username)}>Создать чат</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateChat;