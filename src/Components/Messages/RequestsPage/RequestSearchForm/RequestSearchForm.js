import React, {useEffect, useState} from 'react';
import SearchResults from "../SearchResults/SearchResults";
import {setSearchResults, updateSearchModal} from "../../../../actions/messagesActions";
import {useDispatch, useSelector} from "react-redux";
import {messagesAPI} from "../../../../api/api";
import styles from './RequestSearchForm.module.css'
import ModalOverlay from "../../../../Utils/ModalOverlay/ModalOverlay";
import Toast from "../../../../Utils/Toast/Toast";
import {setErrorMessage} from "../../../../actions/usersActions";

const RequestSearchForm = ({ isSearchModalOpen }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const {errorMessage} = useSelector((state) => state.userReducer);
    const handleAddFriendClick = async (friendId) => {
        try {
            return messagesAPI.addFriendRequest(friendId);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(setErrorMessage(null))
        const searchQuery = event.target.searchQuery.value;
        if (searchQuery !== '') {
            try {
                setIsLoading(true)
                const response = await messagesAPI.getSearchFriends(searchQuery);
                dispatch(setSearchResults(response));
            } catch (error) {
                console.error(error);
                dispatch(setErrorMessage(error.response.data.error))
            }
            finally {
                setIsLoading(false)
            }
        }
    };

    useEffect(() => {
        return () => {
            // Функция выполнится при размонтировании компонента
            dispatch(setErrorMessage(null))
        };
    }, [dispatch]);
    return (
        <div>
            <div className={styles.container_button}>
                <button
                    className={styles.button_search}
                    onClick={() => dispatch(updateSearchModal(true))}
                >
                    Search for friends
                </button>
            </div>
            {isSearchModalOpen && (
                <ModalOverlay isOpen={isSearchModalOpen} onClose={() => dispatch(updateSearchModal(false))}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            name="searchQuery"
                            placeholder="Write username or email"
                            className={styles.form_input}
                        />
                        <button
                            type="submit"
                            className={isLoading ? styles.disabled_button : styles.form_button}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Wait for the search' : 'Search'}
                        </button>
                    </form>
                    {/* Отображение результатов поиска внутри модального окна */}
                    <SearchResults onAddFriendClick={handleAddFriendClick} />
                </ModalOverlay>
            )}
            {errorMessage && <Toast message={errorMessage} type={'error'} duration={10000}/>}
        </div>
    );
};

export default RequestSearchForm;