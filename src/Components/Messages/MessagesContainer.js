import React, {useEffect, useRef, useState} from 'react';
import Messages from "./Messages";
import {
    addSentMessage,
    fetchChatList,
    fetchFriendRequests,
    getChatInfo,
    scrollChatThunk,
    updateLastMessage
} from "../../actions/messagesActions";
import {useDispatch, useSelector} from "react-redux";

const MessagesContainer = (props) => {
    const [loadedMessageCount, setLoadedMessageCount] = useState(0);
    const [webSocket, setWebSocket] = useState(null);
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
        const connectWebSocket = async () => {
            if (chatList.length > 0) {
                if (!webSocket) {
                    if (userId) {
                        const chatIds = chatList.map(chat => chat.chatId).join('/');
                        const socket = new WebSocket(`ws://localhost:8080/${chatIds}/${userId}`);
                        socket.onopen = () => {
                            setWebSocket(socket);
                        };
                        socket.onmessage = (event) => {
                            const messageData = JSON.parse(event.data);
                            switch (messageData.type) {
                                case 'chatMessage':
                                    const {chatId, ...rest} = messageData;
                                    dispatch(addSentMessage(rest));
                                    dispatch(updateLastMessage(chatId, rest));
                                    break;
                                case 'chatCreated':
                                    dispatch(fetchChatList())
                                    break;
                                default:
                                    break;
                            }
                        };
                        socket.onclose = () => {
                            setWebSocket(null);
                        };
                    }
                }
            }
        }
        connectWebSocket()
    }, [dispatch, webSocket, chatList, userId]);
    useEffect(() => {
        return () => {
            // Функция выполнится при размонтировании компонента
            if (webSocket) {
                setWebSocket(null)
                webSocket.close(); // Закрываем сокет
            }
        };
    }, [webSocket])
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
                      messageContainer={messageContainer} webSocket={webSocket} isLoading={isLoading}
                      handleChatClick={handleChatClick} dispatch={dispatch} isSearchModalOpen={isSearchModalOpen}
                      onlineUsers={onlineUsers} activeTab={activeTab} handleTabClick={handleTabClick}
                      handleSearchChange={handleSearchChange}/>);
};

export default MessagesContainer;