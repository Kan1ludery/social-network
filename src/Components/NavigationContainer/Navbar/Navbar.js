import React from 'react';
import styles from './Navbar.module.css';
import buttonStyles from '../Navbutton/Navbutton.module.css';
import Navbutton from '../Navbutton/Navbutton';
import withAuth from '../../../hoc/withAuth';
import handleLogout from '../../Auth/Logout/handleLogout';



const Navbar = ({ isCompressed, username, isAuth, dispatch, navigate, emailVerified, requestsCount }) => {
    const navButtonData = [
        { pathTo: `/profile/${username}`, iUrl: '/assets/icons/navbar/profile.svg', text: 'Profile', },
        { pathTo: '/news', iUrl: '/assets/icons/navbar/news.svg', text: 'News' },
        { pathTo: '/messages', iUrl: '/assets/icons/navbar/messages.svg', text: 'Messages' },
        { pathTo: '/friends', iUrl: '/assets/icons/navbar/friends.svg', text: 'Friends' },
        { pathTo: '/saved', iUrl: '/assets/icons/navbar/saved.svg', text: 'Saved' },
    ];
    const renderNavButtons = () => {
        return navButtonData.map((button, index) => (
            <Navbutton
                key={index}
                pathTo={button.pathTo}
                iUrl={button.iUrl}
                text={button.text}
                isCompressed={isCompressed}
                requestsCount={index === 3 ? requestsCount : null} // Для четвертой кнопки передаем requestsCount
                isAuth={isAuth}
            />
        ));
    };

    return (
        <div className={styles.container_navbar}>
            {renderNavButtons()}
            <div className={styles.gap}></div>
            {isAuth && (
                <>
                    <Navbutton pathTo="/test" iUrl="/assets/icons/navbar/settings.svg" text="Settings" isCompressed={isCompressed} />
                    {emailVerified ? (
                        <Navbutton pathTo="/logout" iUrl="/assets/icons/navbar/logout.svg" text="Logout" isCompressed={isCompressed} />
                    ) : (
                        <button onClick={() => handleLogout(navigate, dispatch)} className={buttonStyles.container_navbutton}>
                            <div className={buttonStyles.block}>
                                <img src={'/assets/icons/navbar/logout.svg'} alt="navbutton" className={buttonStyles.block_image} />
                            </div>
                            <div className={`${buttonStyles.text} ${isCompressed ? buttonStyles.textCompressed : buttonStyles.textExpanded}`}>Logout</div>
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default withAuth(Navbar);
