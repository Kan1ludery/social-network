import React, {useState} from 'react';
import styles from "./ProfileDescription.module.css";
import {setErrorMessage, updateProfileDescription} from "../../../actions/usersActions";

const ProfileDescription = ({profile, dispatch, isCurrentUser}) => {
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [newDescription, setNewDescription] = useState(profile.description || '');
    const [isOverLimit, setIsOverLimit] = useState(false);
    const handleDoubleClick = () => {
        setIsEditingDescription(true);
    };
    const handleBlur = () => {
        setIsEditingDescription(false);
        if (newDescription !== profile.description) {
            dispatch(updateProfileDescription(newDescription));
        }
        dispatch(setErrorMessage(null))
    };
    const handleInputChange = (e) => {
        const inputValue = e.currentTarget.value;
        if (inputValue.length <= 200) {
            setIsOverLimit(false);
            setNewDescription(inputValue);
        } else {
            setIsOverLimit(true);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleBlur();
        }
    };
    const descriptionClass = `${styles.description} ${isOverLimit ? styles.error : ''}`;

    return (<div className={styles.container_profile_description}>
        {!isEditingDescription ? (<span onClick={isCurrentUser ? handleDoubleClick : () => {}}
                                        className={styles.placeholder}>{newDescription || 'No description'}</span>) : (
            isCurrentUser && (
                <div>
                        <textarea
                            autoFocus={true}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className={descriptionClass}
                            value={newDescription}
                            maxLength={600}
                            rows={4}
                        />
                    <div className={styles.charactersCount}>
                        {newDescription.length}/200
                    </div>
                </div>
            )
        )
        }
    </div>);
};

export default ProfileDescription;