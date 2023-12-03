import React from 'react';
import styles from './NonExistingPage.module.css'
import {Link} from "react-router-dom";
const NonExistingPage = (props) => {
    return (
        <div className={styles.container_nonEXPAGE}>
            <p className={styles.text}>404 error: This page doesn't exist</p>
            <img src="/assets/gifs/nonexistencepage/nervousDog.gif" alt="" className={styles.img}/>
            <Link to="/" className={styles.link}>
                Return to Home
            </Link>
        </div>
    );
};

export default NonExistingPage;