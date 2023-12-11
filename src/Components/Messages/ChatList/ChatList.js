import React from 'react';
import Chat from "../Chat/Chat";
import styles from "./ChatList.module.css"

const ChatList = ({chatList, handleChatClick, onlineUsers}) => {
    return (
        <div>
            {chatList.length === 0
                ? <div className={styles.noChats}>There is no chats</div>
                : chatList.map((chat) => (<Chat key={chat.chatId} chatData={chat} handleChatClick={handleChatClick} isOnline={onlineUsers.includes(chat.friendId)}/>))
            }
        </div>
    );
};

export default ChatList;