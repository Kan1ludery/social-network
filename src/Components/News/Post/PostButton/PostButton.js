import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostButton.module.css';

const PostButton = ({ text, iconPath }) => {
    return (
        <button className={styles.button}>
            <img className={styles.image} src={iconPath} alt="icon" />
            <span>{text}</span>
        </button>
    );
};

PostButton.propTypes = {
    text: PropTypes.string.isRequired,
    iconPath: PropTypes.string.isRequired, // React элемент (например, иконка)
    onClick: PropTypes.func,
};

export default PostButton;
