// Navbar component
import React from 'react';
import styles from './Navbar.module.css';
import Navbutton from "../Navbutton/Navbutton";
import withAuth from "../../../hoc/withAuth";
import withEmailConfirmation from "../../../hoc/withEmailConfirmation";

const Navbar = ({isCompressed, user}) => {
    const {username} = user
    return (
        <div className={styles.container_navbar}>
            <Navbutton pathTo={`/profile/${username}`} iUrl="/assets/icons/navbar/profile.svg" text="Profile" isCompressed={isCompressed}  />
            <Navbutton pathTo={"/news"} iUrl="/assets/icons/navbar/news.svg" text="News" isCompressed={isCompressed} />
            <Navbutton pathTo={"/messages"} iUrl="/assets/icons/navbar/messages.svg" text="Messages" isCompressed={isCompressed} />
            <Navbutton pathTo={"/friends"} iUrl="/assets/icons/navbar/friends.svg" text="Friends" isCompressed={isCompressed} />
            <Navbutton pathTo={"/saved"} iUrl="/assets/icons/navbar/saved.svg" text="Saved" isCompressed={isCompressed} />
            <div className={styles.gap}></div>
            <Navbutton pathTo={"/test"} iUrl="/assets/icons/navbar/settings.svg" text="Settings" isCompressed={isCompressed}/>
        </div>
    );
};

export default withAuth(withEmailConfirmation(Navbar));
