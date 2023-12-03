import React from 'react';
import SearchResults from "../SearchResults/SearchResults";
import {Field, Form, Formik} from "formik";
import {fetchUsersSearch, updateSearchModal} from "../../../../actions/messagesActions";
import {useDispatch} from "react-redux";
import {messagesAPI} from "../../../../api/api";
import styles from './RequestSearchForm.module.css'

const RequestSearchForm = ({isSearchModalOpen}) => {
    const dispatch = useDispatch()
    const handleAddFriendClick = async (friendId) => {
        try {
            return messagesAPI.addFriendRequest(friendId)
        } catch (error) {
            return console.error(error)
        }
    };
    return (
        <div>
            <div className={styles.container_button}>
                <button className={styles.button_search}
                        onClick={() => dispatch(updateSearchModal(true))}>Search for friends
                </button>
            </div>
            {isSearchModalOpen && (<div className={styles.overlay} onClick={() => dispatch(updateSearchModal(false))}>
                    <div className={styles.search_modal} onClick={(e) => e.stopPropagation()}>
                        <Formik
                            initialValues={{
                                searchQuery: '',
                            }}
                            onSubmit={async (values, {setSubmitting}) => {
                                if (values.searchQuery !== '') {
                                    setSubmitting(true)
                                    dispatch(fetchUsersSearch(values));
                                    setSubmitting(false)
                                }
                            }}>
                            {({isSubmitting}) => (
                                <Form>
                                    <Field
                                        type="text"
                                        name="searchQuery"
                                        placeholder="Write username or email"
                                        className={styles.form_input}
                                    />
                                    <button type="submit"
                                            className={isSubmitting ? styles.disabled_button : styles.form_button}
                                            disabled={isSubmitting}>Search
                                    </button>
                                </Form>)}
                        </Formik>
                        {/* Отображение результатов поиска внутри модального окна */}
                        <SearchResults
                            onAddFriendClick={handleAddFriendClick}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestSearchForm;