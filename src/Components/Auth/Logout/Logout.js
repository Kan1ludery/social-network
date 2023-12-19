import React from 'react';
import styles from './Logout.module.css'
import handleLogout from "./handleLogout";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Logout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Получите диспетчер Redux
    return (<div className={styles.logoutPage}>
            <div className={styles.logoutContainer}>
                <div className={styles.icon}>
                    {/* Ваша иконка здесь */}
                </div>
                <div className={styles.text}>
                    <p>Are you sure you want to log out?</p>
                </div>
                {token && (
                    <button onClick={()=> handleLogout(navigate, dispatch)} className={styles.button}>
                        Log out
                    </button>
                )}
            </div>
        </div>
    );
};

export default Logout;
