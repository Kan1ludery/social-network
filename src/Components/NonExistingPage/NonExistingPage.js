import React from 'react';
import styles from './NonExistingPage.module.css'
import {Link} from "react-router-dom";
const NonExistingPage = (props) => {
    return (
        <div className={styles.container_nonPage}>
            <div className={styles.container_info}>
                <p className={styles.text}>This page doesn't exist</p>
                <Link to="/" className={styles.link}>
                            RETURN TO HOME
                </Link>
            </div>
            <img src="/assets/img/nonExistingPage/404.png" alt="" className={styles.image}/>
        </div>
    );
};

export default NonExistingPage;