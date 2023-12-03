import React from 'react';
import styles from "./Navbutton.module.css";
import {NavLink, useLocation} from "react-router-dom";

const Navbutton = ({pathTo, iUrl, text, isCompressed}) => {
    const location = useLocation()
    const isActive = location.pathname === pathTo;
    const handleButtonClick = (path) => {
        // Сохраняем URL кнопки в localStorage перед переходом на страницу входа
        if (path === '') {
            localStorage.setItem('requestedPath', '/')
        }
        if (path !== '/logout') {
            localStorage.setItem('requestedPath', path);
        }
    };
    return (
        <NavLink to={pathTo} className={`${styles.container_navbutton} ${isActive ? styles.active : ""}`} onClick={() => handleButtonClick(pathTo)}>
            <div className={styles.block}>
                <img src={iUrl} alt="navbutton" className={styles.block_image}/>
            </div>
            <div className={`${styles.text} ${isCompressed ? styles.textCompressed : styles.textExpanded}`}>{text}</div>
        </NavLink>
    );
};

export default Navbutton;