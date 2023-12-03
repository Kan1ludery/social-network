import React from 'react';
import styles from './SocialIcons.module.css'
import SocialIcon from "./SocialIcon/SocialIcon";

const SocialIcons = ({socialLinks, isCurrentUser, isLoading, profile}) => {
    const socialNetworks = [
        { type: 'vk', name: 'VK' },
        { type: 'telegram', name: 'Telegram' },
        { type: 'twitter', name: 'Twitter' },
        { type: 'facebook', name: 'Facebook' },
        { type: 'instagram', name: 'Instagram' }
    ];
    const hasSocialLink = (type) => {
        return socialLinks.hasOwnProperty(type) && socialLinks[type] !== '';
    };
    return (
        <div className={styles.socialLinksContainer}>
            <div className={styles.socialLinks}>
                {socialNetworks.map((socialNetwork) => (
                    <SocialIcon
                        key={socialNetwork.type}
                        type={socialNetwork.type}
                        isCurrentUser={isCurrentUser}
                        profile={profile}
                        isActive={hasSocialLink(socialNetwork.type)
                    }
                    />
                ))}
            </div>
            <div>
                {isLoading && <p>Loading...</p>}
            </div>
        </div>
    );
};

export default SocialIcons;
