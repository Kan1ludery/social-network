import React from 'react';
import Chat from "../Chat/Chat";

const ChatList = ({chatList, handleChatClick, onlineUsers}) => {
    return (
        <div>
            {chatList.length === 0
                ? <div>There is no chats yet</div>
                : chatList.map((chat) => (<Chat key={chat.chatId} chatData={chat} handleChatClick={handleChatClick} isOnline={onlineUsers.includes(chat.friendId)}/>))
            }
        </div>
    );
};

export default ChatList;