import React from 'react';
import styles from './OnlineStatusIndicator.module.css';

const OnlineStatusIndicator = ({ isOnline }) => {
    const currentStatus = isOnline ? styles.online : styles.offline;

    return (
        <div className={styles.status_indicator}>
            <div className={`${styles.status_circle} ${currentStatus}`}></div>
        </div>
    );
};

export default OnlineStatusIndicator;
