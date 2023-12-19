import React, {Suspense, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile, setAuthStatus, setOnlineUsers} from "./actions/usersActions";
import Loading from "./Utils/Loading/Loading";
import {isAuthenticated, refreshAuthToken} from "./api/apiUtils";
import io from "socket.io-client";
import {fetchChatList, fetchFriendRequests} from "./actions/messagesActions";
import {baseServerURL} from "./api/api";

const App = React.lazy(() => import('./App')); // Загружаем компонент App динамически
const AppContainer = () => {
    // Получение информации о пользователе
    const dispatch = useDispatch();
    const {user: {_id: userId}, token} = useSelector((state) => state.userReducer)
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
        const socket = io(`${baseServerURL}/socketIO1`, {
            auth: {
                userId: userId // Передаём userId в объекте аутентификации
            }
        });
        socket.on('connect', () => {

        });

        socket.on('friendAdded', (data) => {
            dispatch(fetchFriendRequests());
        });

        socket.on('chatAdded', (data) => {
            dispatch(fetchChatList())
        });
        return () => {
            socket.disconnect(); // Отключение сокета при размонтировании компонента
        };
    }, [dispatch, userId]);
    useEffect(() => {
        if (userId) {
            const socket2 = io(`${baseServerURL}/socketIO2`);
            // Обработка успешного соединения
            socket2.on('connect', () => {
                const token = localStorage.getItem('token');
                socket2.emit('socketStatus', {token});
            });

            socket2.on('onlineUsers', (data) => {
                dispatch(setOnlineUsers(data));
            });

            return () => {
                socket2.disconnect();
            };
        }
    }, [dispatch, userId]);

    useEffect(() => {
        // Проверяем, что предыдущий токен был пустым, а новый токен не пустой
        if (token !== '' && token !== null) {
            window.location.href = '/';
        }
    }, [token]);
    return (
        <Suspense fallback={<Loading/>}>
            <App/>
        </Suspense>
    );

};

export default AppContainer;
