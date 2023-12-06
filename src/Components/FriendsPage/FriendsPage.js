import React, {useEffect, useState} from 'react';
import styles from './Friends.module.css';
import {usersAPI} from '../../api/api';
import withAuth from '../../hoc/withAuth';
import Loading from '../../Utils/Loading/Loading';
import UserCard from "./UserCard/UserCard";
import {useDispatch, useSelector} from "react-redux";
import RequestsPage from "../Messages/RequestsPage/RequestsPage";
import {fetchFriendRequests} from "../../actions/messagesActions";

const FriendsPage = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [activeTab, setActiveTab] = useState('friends');
    const {onlineUsers} = useSelector((state) => state.userReducer);
    const {usersRequests} = useSelector((state) => state.messagesReducer)
    console.log(usersRequests)
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(fetchFriendRequests());
                const usersData = await usersAPI.getFriends();
                const {friends, friendCount} = usersData;
                setData(friends);
                setCount(friendCount);
            } catch (error) {
                console.error('Error fetching data in component:', error);
            }
        };
        fetchData();
    }, [dispatch, activeTab]);

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
    return (
        <div className={styles.friendsPage}>
            <h1 className={styles.pageTitle}>Friends Page</h1>
            <div className={styles.tabs}>
                <button onClick={() => handleTabChange('friends')}>
                    Friends
                </button>
                <button onClick={() => handleTabChange('friendRequests')}>
                    Friend Requests {usersRequests.requestsCount > 0 ? `(${usersRequests.requestsCount})` : ''}
                </button>
            </div>
            {
                activeTab === 'friends' ? (
                    <>
                        <p className={styles.friendCount}>Total friends: {count}</p>
                        {data.length > 0 ? (
                            <ul className={styles.friendList}>
                                {data.map((user) => (
                                    <li key={user._id} className={styles.friendItem}>
                                        <UserCard user={user} isOnline={onlineUsers.includes(user._id)}/>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Loading/>
                        )}
                    </>
                ) : (
                    <div><RequestsPage usersRequestList={usersRequests}/></div>
                )
            }
        </div>
    );
};

export default withAuth(FriendsPage);
