import React from 'react';
import styles from "./Navbutton.module.css";
import {NavLink, useLocation} from "react-router-dom";
import withEmailConfirmation from "../../../hoc/withEmailConfirmation";
import getUserInfoFromToken from "../../../Utils/Functions/getUserInfoFromToken";

const Navbutton = ({pathTo, iUrl, isAuth, text, isCompressed, requestsCount = null}) => {
    const location = useLocation()
    const currentPath = location.pathname; // Получение текущего пути
    const isActive = location.pathname === pathTo;
    const {emailVerified} = getUserInfoFromToken()
    return (
        <NavLink to={emailVerified ? pathTo : currentPath} className={`${styles.container_navbutton} ${isActive ? styles.active : ""}`}>
            <div className={styles.block}>
                <img src={iUrl} alt="navbutton" className={styles.block_image}/>
                {requestsCount ? <div className={styles.requestsContainer}>
                    <div className={styles.requests}>{requestsCount}</div>
                </div> : ''}
            </div>
            <div className={`${styles.text} ${isCompressed ? styles.textCompressed : styles.textExpanded}`}>{text}</div>
        </NavLink>
    );
};

export default withEmailConfirmation(Navbutton);