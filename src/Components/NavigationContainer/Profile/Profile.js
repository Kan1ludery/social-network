import React from 'react';
import styles from './Profile.module.css'
import Search from "../../../Utils/SearchComponent/Search";
import UserImage from "../../../Utils/UserImage/UserImage";

const Profile = React.memo(({isCompressed, setIsCompressed, username, email, isAuth, userImageFileName}) => {
    return (<div>
        {isAuth ? <div
            className={!isCompressed ? styles.container_profile : `${styles.container_profile} ${styles.container_profile_compressed}`}>
            <div className={styles.searchContainer}>
                <Search
                    className={!isCompressed ? styles.input_bar : `${styles.input_bar} ${styles.input_compressed}`}
                    placeholder={'Search'}
                    id={'profileSearch'}
                    type={'search'}
                    isCompressed={isCompressed}
                    isDisabled={true}
                />
                    <span className={styles.icon}>
                        <i className={styles.searchIcon}></i>
                    </span>
                <button
                    className={`${styles.roll_up_button} ${!isCompressed ? '' : styles.active}`}
                    onClick={setIsCompressed} aria-label="Roll Up"></button>
            </div>
            <div className={styles.container_person}>
                <div>
                    <UserImage imageName={userImageFileName} alt="profile_person" className={styles.person_image}
                               clickable={true} to={`/profile/${username}`}/>
                </div>

                <div
                    className={!isCompressed ? styles.container_person_info : `${styles.container_person_info} ${styles.person_compressed}`}>
                    <div className={styles.name} title={username}>{username}</div>
                    <a href="/">
                        <div className={styles.tag} title={email}>{email}</div>
                    </a>
                </div>
            </div>
        </div> : <div className={styles.container_unregistered}>
            <div className={styles.unregistered}>
                <p>Please login or register.</p>
                <div>
                    <a href="/login" className={styles.login}>Login</a>
                    <a href="/register" className={styles.register}>Register</a>
                </div>
            </div>
        </div>}
    </div>);
});

export default Profile;