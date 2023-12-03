import React, { useEffect, useState } from 'react';
import styles from './Toast.module.css'; // CSS-стили для компоненты Toast

const Toast = ({ message = '', type = 'info', duration = 10000 }) => {
    const [visible, setVisible] = useState(true);

    const handleClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [duration]);

    const getClassName = () => {
        switch (type) {
            case 'error':
                return styles.toast_danger;
            case 'warning':
                return styles.toast_warning;
            case 'info':
                return styles.toast_info;
            default:
                return styles.toast_default;
        }
    };

    return visible ? (
        <div className={styles.toastContainer}>
            <div className={`${styles.toast} ${getClassName()}`}>
                <div className={styles.toast__header}>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <p className={styles.toast__body}>{message}</p>
                <img src="https://cdn-icons-png.flaticon.com/512/17/17047.png" alt="" className={styles.toast__close} onClick={handleClose}/>
            </div>
        </div>
    ) : null;
};

export default Toast;
