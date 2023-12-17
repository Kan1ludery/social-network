import React, {useEffect, useRef, useState} from 'react';
import Messages from "./Messages";
import {
    addSentMessage, fetchChatList, fetchFriendRequests, getChatInfo, scrollChatThunk, updateLastMessage
} from "../../actions/messagesActions";
import {useDispatch, useSelector} from "react-redux";
import io from "socket.io-client";
import {baseServerURL} from "../../api/api";

const MessagesContainer = (props) => {
    const [loadedMessageCount, setLoadedMessageCount] = useState(0);
    const [socketIo, setSocketIo] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [activeTab, setActiveTab] = useState('messages'); // Изначально активен раздел "messages"
    const messageContainer = useRef(null); // Создаем useRef для inputContainer
    const messagesPerPage = 25;
    const dispatch = useDispatch()
    const {user, onlineUsers} = useSelector((state) => state.userReducer)
    const {_id: userId} = user
    const {
        chatList, usersRequests, isLoading, activeChat, isSearchModalOpen
    } = useSelector((state) => state.messagesReducer)
    useEffect(() => {
        dispatch(fetchChatList())
        dispatch(fetchFriendRequests());
    }, [dispatch]);
    useEffect(() => {
        if (!socketIo && chatList.length > 0 && userId) {
            const chatIds = chatList.map(chat => chat.chatId);
            const socket = io(`${baseServerURL}/socketIO3`, {
                auth: {
                    chatIds: chatIds,
                    userId: userId
                }
            });

            socket.on('connect', () => {
                setSocketIo(socket); // Сохраняем сокет в состоянии
            });
            socket.on('chatMessage', (messageData) => {
                const {chatId, ...rest} = messageData;
                dispatch(addSentMessage(rest));
                dispatch(updateLastMessage(chatId, rest));
            });

            socket.on('chatCreated', () => {
                dispatch(fetchChatList());
            });
            socket.on('disconnect', () => {
                setSocketIo(null)
            })
        }
        return () => {
            if (socketIo) {
                socketIo.disconnect();
            }
        };
    }, [dispatch, chatList, userId, socketIo]);

    useEffect(() => {
        // Получаем ссылку на элемент inputContainer через useRef
        const current = messageContainer.current;

        function handleScroll() {
            if (current) {
                const isAtBottom = current.scrollHeight + current.scrollTop === current.clientHeight;
                if (isAtBottom) {
                    // Подгрузка новых сообщений здесь
                    const from = loadedMessageCount + 1;
                    const to = loadedMessageCount + messagesPerPage;
                    dispatch(scrollChatThunk(activeChat.chatId, from, to));
                    setLoadedMessageCount(loadedMessageCount + messagesPerPage);
                }
            }
        }

        if (current) {
            current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (current) {
                current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [dispatch, loadedMessageCount, activeChat]);
    const handleChatClick = async (chatData, status, targetId = null) => {
        try {
            dispatch(getChatInfo(chatData, 0, messagesPerPage, status));
            setLoadedMessageCount(messagesPerPage);
        } catch (error) {
            console.error('Ошибка при получении информации о чате:', error);
        }
    };
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filteredChatList = chatList.filter(chat => {
        return chat.username.toLowerCase().includes(searchValue.toLowerCase());
    });
    // Функция для открытия оверлея
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    return (<Messages filteredChatList={filteredChatList} usersRequests={usersRequests} activeChat={activeChat}
                      messageContainer={messageContainer} webSocket={socketIo} isLoading={isLoading}
                      handleChatClick={handleChatClick} dispatch={dispatch} isSearchModalOpen={isSearchModalOpen}
                      onlineUsers={onlineUsers} activeTab={activeTab} handleTabClick={handleTabClick}
                      handleSearchChange={handleSearchChange}/>);
};

export default MessagesContainer;