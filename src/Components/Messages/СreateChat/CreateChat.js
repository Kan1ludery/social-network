import React, {useEffect} from 'react';
import styles from "./CreateChat.module.css";
import {useDispatch, useSelector} from "react-redux";
import {getRandomUsersInfo} from "../../../actions/usersActions";
import UserImage from "../../../Utils/UserImage/UserImage";

const CreateChat = ({closeOverlay}) => {
    const dispatch = useDispatch()
    const {randomUsers} = useSelector((state) => state.userReducer)
    useEffect(() => {
        dispatch(getRandomUsersInfo())
    }, [dispatch])

    return (
        <div className={styles.overlay} onClick={closeOverlay}>
            <div className={styles.search_modal} onClick={(e) => e.stopPropagation()}>
                Это может быть формой
                {randomUsers.map((user) => <div key={user._id}>
                    <UserImage className={styles.avatar} imageName={user.profile.profileImage}/>
                    {user.username}</div>
                )}
            </div>
        </div>
    );
};

export default CreateChat;