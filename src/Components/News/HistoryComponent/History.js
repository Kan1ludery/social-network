import React from 'react';
import styles from './History.module.css'

const History = ({ iUrl, isPlus }) => {
    return (
        <div className={styles.container}>
            <div>
                <button className={isPlus ? styles.plus : styles.button}><img src={iUrl} alt=""/></button>
            </div>
        </div>
    );
};

export default History;
