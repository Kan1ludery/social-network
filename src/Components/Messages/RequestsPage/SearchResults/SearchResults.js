import React from 'react';
import styles from './SearchResults.module.css'
import {useSelector} from "react-redux";
import UserImage from "../../../../Utils/UserImage/UserImage";

const SearchResults = ({ onAddFriendClick }) => {
    const {searchResults} = useSelector((state) => state.messagesReducer);
    console.log(searchResults)
    return (
        <div>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((item) => (
                        <li key={item._id}>
                            <div className={styles.container_user}>
                                <UserImage imageName={item.profileImage} className={styles.image} alt={'search_image'} />
                                <p className={styles.username}>{item.username}</p>
                                <button onClick={() => onAddFriendClick(item._id)} className={styles.button}>Add as a friend</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div></div>
            )}
        </div>
    );
};

export default SearchResults;
