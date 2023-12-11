import React from 'react';
import styles from './ModalOvelay.module.css'; // Обрати внимание на правильное название модуля

const ModalOverlay = ({ isOpen, onClose, children }) => {
    return (
        isOpen && (
            <div className={styles.overlay} onClick={onClose}>
                <div className={styles.search_modal} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        )
    );
};

export default ModalOverlay;
