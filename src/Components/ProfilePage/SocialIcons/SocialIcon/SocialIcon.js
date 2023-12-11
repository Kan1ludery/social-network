import React, {useState} from 'react';
import styles from './SocialIcon.module.css';
import {useDispatch} from "react-redux";
import {setErrorMessage, setSocialLink, updateSocialLinks} from "../../../../actions/usersActions";
import {NavLink} from "react-router-dom";

const SocialIcon = ({type, isActive, isCurrentUser, profile}) => {
    const dispatch = useDispatch()
    const {socialLinks} = profile

    const inputValue = socialLinks[type] || '';
    const [textValue, setTextValue] = useState(inputValue);
    const [activeIcon, setActiveIcon] = useState(null);

    const placeholderTexts = {
        telegram: 'Enter link for Telegram',
        twitter: 'Enter Twitter profile',
        facebook: 'Enter Facebook profile',
        instagram: 'Enter Instagram profile',
        default: `Enter link for ${type}`,
    };

    const placeholder = placeholderTexts[type] || placeholderTexts.default;

    const handleIconClick = () => {
        dispatch(setErrorMessage(null))
        setActiveIcon(type);
        setTextValue(inputValue)
    };

    const handleInputChange = (e) => {
        const newText = e.target.value;
        dispatch(setSocialLink(type, newText));
    };
    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    const handleInputBlur = (e) => {
        if (inputValue !== textValue) {
            dispatch(updateSocialLinks(activeIcon, inputValue));
        }
        setActiveIcon(null);
    };

    return (
        <div className={styles.iconContainer}>
            {isCurrentUser ? (
                <button onClick={handleIconClick} className={styles.button}>
                    <img
                        className={styles.icon}
                        src={`/assets/icons/socialLinks/${type}${isActive ? 'Color' : 'Blind'}.svg`}
                        alt={`${type} ${isActive ? 'Active' : 'Inactive'}`}
                    />
                </button>
            ) : (
                <NavLink to={`${inputValue}`} className={styles.button} target="_blank">
                    <img
                        className={styles.icon}
                        src={`/assets/icons/socialLinks/${type}${isActive ? 'Color' : 'Blind'}.svg`}
                        alt={`${type} ${isActive ? 'Active' : 'Inactive'}`}
                    />
                </NavLink>
            )}
            {activeIcon && (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    placeholder={placeholder}
                    className={styles.input}
                    autoFocus
                />
            )}
        </div>
    );
};

export default SocialIcon;
