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
    const messageContainer = useRef(null); // Создаем useRef для inputContainer

    const messagesPerPage = 25;

    const dispatch = useDispatch()


    const {user} = useSelector((state) => state.userReducer)
    const {_id: userId} = user
    const {chatList, usersRequests, isLoading, activeChat} = useSelector((state) => state.messagesReducer)
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
                            console.log('WebSocket connection opened.');
                            setWebSocket(socket);
                        };
                        socket.onmessage = (event) => {
                            const messageData = JSON.parse(event.data);
                            console.log(messageData)
                            switch (messageData.type) {
                                case 'chatMessage':
                                    const {chatId, ...rest} = messageData;
                                    console.log(`Получено сообщение от сервера: ${rest.text}`);
                                    dispatch(addSentMessage(rest));
                                    dispatch(updateLastMessage(chatId, rest));
                                    break;
                                case 'chatCreated':
                                    console.log(`Чат с ID ${messageData.chatId} был успешно создан.`);
                                    dispatch(fetchChatList())
                                    break;
                                default:
                                    break;
                            }
                        };
                        socket.onclose = () => {
                            console.log('WebSocket connection closed.');
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
                    console.log('Дошли до нижнего конца inputContainer.');
                    // Подгрузка новых сообщений здесь
                    const from = loadedMessageCount + 1;
                    const to = loadedMessageCount + messagesPerPage;
                    dispatch(scrollChatThunk(activeChat.chatId, from, to));
                    setLoadedMessageCount(loadedMessageCount + messagesPerPage);
                    console.log(loadedMessageCount)
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
    return (
        <Messages chatList={chatList} usersRequests={usersRequests} activeChat={activeChat}
                  messageContainer={messageContainer} webSocket={webSocket} isLoading={isLoading}
                  handleChatClick={handleChatClick}/>
    );
};

export default MessagesContainer;