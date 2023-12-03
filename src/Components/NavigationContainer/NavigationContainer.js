import React, {useEffect} from 'react';
import styles from './NavigationContainer.module.css'
import Profile from "./Profile/Profile";
import Navbar from "./Navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {saveCompressionState, setActualCompress} from "../../reducers/navigationReducer";

const NavigationContainer = (props) => {
    const dispatch = useDispatch();
    const {isCompressed} = useSelector(state => state.navigationReducer);
    const {user, isAuth} = useSelector((state) => state.userReducer);
    const userImageFileName = useSelector((state) => state.userReducer.user.profile.profileImage);
    // Проверка на существование user и user.profile.states
    const actualCompress = user && user.profile && user.profile.states ? user.profile.states.isCompressed : true;
    const setIsCompressed = () => {
        dispatch(saveCompressionState(!isCompressed)); // Отправляем измененное состояние на сервер
    };
    useEffect(() => {
        dispatch(setActualCompress(actualCompress));
    }, [dispatch, actualCompress]);
    const containerStyle = {
        width: !isCompressed ? '400px' : '170px',
    };
    return (
        <div className={styles.container} style={containerStyle}>
            <Profile isCompressed={isCompressed} setIsCompressed={setIsCompressed} user={user} isAuth={isAuth} userImageFileName={userImageFileName}/>
            <Navbar isCompressed={isCompressed} user={user}/>
        </div>
    );
};

export default NavigationContainer;