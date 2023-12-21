import React, {useEffect, useState} from 'react';
import styles from './Friends.module.css';
import withAuth from '../../hoc/withAuth';
import UserCard from "./UserCard/UserCard";
import {useDispatch, useSelector} from "react-redux";
import RequestsPage from "../Messages/RequestsPage/RequestsPage";
import Search from "../../Utils/SearchComponent/Search";
import Loading from "../../Utils/Loading/Loading";
import {updateFriends} from "../../actions/usersActions";

const FriendsPage = () => {
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'friends');
    const [searchValue, setSearchValue] = useState('');

    const {usersRequests, isSearchModalOpen, isLoading} = useSelector((state) => state.messagesReducer)
    const {user, friendsList, friendsCount, onlineUsers} = useSelector((state) => state.userReducer)
    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(updateFriends())
            } catch (error) {
                console.error('Error fetching data in component:', error);
            }
        };
        fetchData();
    }, [dispatch, activeTab]);
    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);
    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };
    const filteredFriendsList = friendsList.filter(friend => {
        return friend.username.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (<div className={styles.friendsPage}>
        <h1 className={styles.pageTitle}>Friends Page</h1>
        <div className={styles.tabs}>
            <button onClick={() => handleTabChange('friends')}
                    className={activeTab === 'friends' ? styles.activeTab : styles.inactiveTab}>
                Friends
            </button>
            <button onClick={() => handleTabChange('friendRequests')}
                    className={activeTab === 'friendRequests' ? styles.activeTab : styles.inactiveTab}>
                Friend Requests {usersRequests.requestsCount > 0 ? <div className={styles.requestsContainer}>
                <div className={styles.requests}>{usersRequests.requestsCount}</div>
            </div> : ''}
            </button>
        </div>
        {activeTab === 'friends' ? (<>
            <div className={styles.container_info}>
                <p className={styles.friendCount}>Total friends: {friendsCount}</p>
                <Search className={styles.searchBar} placeholder={'Type username for search'}
                        id={'searchBar'} type={'input'} onChange={handleSearchChange}/>
            </div>
            {isLoading ? (<Loading/>) : (friendsList.length > 0 ? (<ul className={styles.friendList}>
                {filteredFriendsList.map((otherUser) => (<li key={otherUser._id} className={styles.friendItem}>
                    <UserCard otherUser={otherUser} isOnline={onlineUsers.includes(otherUser._id)} user={user}
                              dispatch={dispatch}/>
                </li>))}
            </ul>) : (<div className={styles.noFriends}>There are no friends</div>))}

        </>) : (<div><RequestsPage usersRequestList={usersRequests} isSearchModalOpen={isSearchModalOpen}/></div>)}
    </div>);
};

export default withAuth(FriendsPage);
