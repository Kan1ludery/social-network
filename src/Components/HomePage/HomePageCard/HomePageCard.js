import React from 'react';
import styles from './HomePageCard.module.css';

const HomePageCard = ({title, description, technologies, image, customStyles}) => {
    const {
        cardClass = '',
        titleClass = '',
        descriptionClass = '',
        imageClass = '',
        contentClass = '',
    } = customStyles || {};
    return (
        <div className={`${styles.card} ${styles[cardClass]}`}>
            <h2 className={`${styles.title} ${styles[titleClass]}`}>{title}</h2>
            <img src={image} alt={title} className={`${styles.cardImage} ${styles[imageClass]}`}/>
            <p className={`${styles.containerSpan} ${styles[descriptionClass]}`}>
                {description.split('\n').map((line, index) => (
                    <span key={index} className={`${styles.cardDescription}`}>
                    {line}<br/>
                    </span>
                ))}
            </p>
            <ul className={`${styles.cardContent} ${styles[contentClass]}`}>
                <div className={styles.containerTech}>
                    {technologies.map((tech, index) => (
                        <li key={index} className={styles.tech}>{tech}</li>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default HomePageCard;
