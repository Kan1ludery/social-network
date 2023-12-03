import React, { useState } from 'react';
import styles from './FastMenu.module.css';

const FastMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={styles.menu_container}>
            <div className={`${styles.menu_icon} ${menuOpen ? styles.active : ''}`} onClick={toggleMenu}>
                <img src="/assets/icons/arrow-icon.svg" alt="Menu" width="32" height="32" />
            </div>
            {menuOpen && (
                <div className={styles.menu_content}>
                    <button className={styles.menu_item}>Оповещения</button>
                    <button className={styles.menu_item}>Регистрация</button>
                    {/* Дополнительные кнопки и контент меню */}
                </div>
            )}
        </div>
    );
};

export default FastMenu;
