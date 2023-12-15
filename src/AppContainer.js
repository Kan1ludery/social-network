import React, {Suspense, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, setAuthStatus, setOnlineUsers} from "./actions/usersActions";
import Loading from "./Utils/Loading/Loading";
import {isAuthenticated, refreshAuthToken} from "./api/apiUtils";
import io from "socket.io-client";
import {fetchFriendRequests} from "./actions/messagesActions";

const App = React.lazy(() => import('./App')); // Загружаем компонент App динамически
const AppContainer = () => {
    // Получение информации о пользователе
    const dispatch = useDispatch();
    const {user: {_id: userId}, token} = useSelector((state) => state.userReducer)
    const [webSocket, setWebSocket] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const isAuth = isAuthenticated();
            if (isAuth) {
                dispatch(setAuthStatus(true));
                dispatch(getUserProfile());
            } else {
                const newToken = await refreshAuthToken();
                if (newToken) {
                    dispatch(setAuthStatus(true));
                    dispatch(getUserProfile());
                }
            }
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (!webSocket) {
            if (userId) {
                const socket = new WebSocket(`ws://social-network-api.up.railway.app:8081`);
                socket.onopen = () => {
                    setWebSocket(socket);
                    const token = localStorage.getItem('token')
                    socket.send(JSON.stringify({ type: 'socketStatus', token }));
                };
                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    if (data.type === 'onlineUsers') {
                        dispatch(setOnlineUsers(data.data))
                    }
                };
                socket.onclose = () => {
                    setWebSocket(null);
                };
            }
        }
    }, [dispatch, webSocket, userId]);
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
        // Проверяем, что предыдущий токен был пустым, а новый токен не пустой
        if (token !== '' && token !== null) {
            window.location.href = '/';
        }
    }, [token]);
    useEffect(() => {
        const socket = io('https://social-network-api.up.railway.app/', {
            auth: {
                userId: userId // Передаём userId в объекте аутентификации
            }
        });

        socket.on('friendAdded', (data) => {
            dispatch(fetchFriendRequests());
        });

        return () => {
            socket.disconnect(); // Отключение сокета при размонтировании компонента
        };
    }, [dispatch, userId]);
    return (
        <Suspense fallback={<Loading/>}>
            <App/>
        </Suspense>
    );

};

export default AppContainer;
