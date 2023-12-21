import React, {useEffect} from 'react';
import styles from './NavigationContainer.module.css'
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {saveCompressionState, setActualCompress} from "../../reducers/navigationReducer";
import {useNavigate} from "react-router-dom";
import getUserInfoFromToken from "../../Utils/Functions/getUserInfoFromToken";
import useCurrentUser from "../../customHooks/useCurrentUser";

const NavigationContainer = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { emailVerified } = getUserInfoFromToken();
    const {isCompressed} = useSelector(state => state.navigationReducer);
    const {isAuth} = useSelector((state) => state.userReducer);
    const {usersRequests} = useSelector((state) => state.messagesReducer);
    const {requestsCount} = usersRequests
    const {profile, username, email} = useCurrentUser()
    const userImageFileName = profile.profileImage;
    // Проверка на существование user и user.profile.states
    const actualCompress = profile.states ? profile.states.isCompressed : true;
    const setIsCompressed = () => {
        dispatch(saveCompressionState(!isCompressed)); // Отправляем измененное состояние на сервер
    };
    useEffect(() => {
        dispatch(setActualCompress(actualCompress));
    }, [dispatch, actualCompress]);
    const containerStyle = {
        minWidth: !isCompressed ? '400px' : '170px',
        width: isCompressed ? '170px' : '400px', // Добавляем изменение ширины
    };
    return (
        <div className={styles.container} style={containerStyle}>
            <Profile isCompressed={isCompressed} setIsCompressed={setIsCompressed} username={username} email={email} isAuth={isAuth} userImageFileName={userImageFileName}/>
            <Navbar isCompressed={isCompressed} username={username} isAuth={isAuth} dispatch={dispatch} navigate={navigate} emailVerified={emailVerified} requestsCount={requestsCount}/>
        </div>
    );
};

export default NavigationContainer;