import React, {lazy, useEffect} from 'react';
import styles from './ProfilePage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getOtherUserProfile, setError, setErrorMessage} from "../../actions/usersActions";
import {useParams} from "react-router-dom";
import Toast from "../../Utils/Toast/Toast";
import Loading from "../../Utils/Loading/Loading";

const ProfileInfo = lazy(() => import("./ProfileInfo/ProfileInfo"));

const ProfilePage = () => {
    const dispatch = useDispatch();
    const {username} = useParams();

    const {error, isLoading, errorMessage, user, otherUser} = useSelector((state) => state.userReducer);
    const {_id: otherUserId, username: otherUsername, email, profile} = otherUser
    useEffect(() => {
        /** Получаем профиль пользователя (уточнение: other - любого, даже нашего)*/
        dispatch(getOtherUserProfile(username));
        return () => {
            // Функция выполнится при размонтировании компонента
            dispatch(setError(false))
            dispatch(setErrorMessage(null))
        };
    }, [dispatch, username]);
    const isCurrentUser = user._id === otherUserId;
    return (<div className={styles.profile_page_container}>
            {error ? (<div>{error.response.data.error}</div>) : (<>
                    {isLoading ? (// Отображаем загрузочный экран или индикатор, пока данные загружаются
                        <Loading />) : (<ProfileInfo
                            user={user}
                            isCurrentUser={isCurrentUser}
                            otherUsername={otherUsername}
                            email={email}
                            profile={profile}
                            isLoading={isLoading}
                            dispatch={dispatch}
                        />)}
                </>)}
            {errorMessage && <Toast message={errorMessage} type={'error'} duration={10000}/>}
        </div>);
};

export default ProfilePage;
