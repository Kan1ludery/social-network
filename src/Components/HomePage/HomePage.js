import React, {useRef, useEffect, useState} from 'react';
import styles from './HomePage.module.css';
import HomePageCard from './HomePageCard/HomePageCard';
import {cardDataEn} from "./HomePageCard/data_en";
import {cardDataRu} from "./HomePageCard/data_ru";
import {useLocalStorage} from "../../customHooks/useLocalStorage";

const HomePage = (props) => {
    const [isEnglish, setIsEnglish] = useLocalStorage(true, 'english');
    const cardsRef = useRef([]);
    const [scrolling, setScrolling] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const cards = ['About the Site', 'Profile Page', 'News Page', 'Messages Page', 'Friends Page', 'Saved Page', 'Settings Page', 'Logout Page', 'Final Page',];

    const cardData = isEnglish ? cardDataEn : cardDataRu
    useEffect(() => {
        const savedIndex = parseInt(localStorage.getItem('activeIndex'), 10);

        const cardsArray = cardsRef.current;
        if (savedIndex >= 0 && savedIndex < cardsArray.length) {
            cardsArray[savedIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveIndex(savedIndex);
        }
    }, []); // Пустой массив зависимостей для выполнения один раз при монтировании
    useEffect(() => {
        const handleWheelScroll = (e) => {
            e.preventDefault();
            const delta = Math.sign(e.deltaY);

            if (!scrolling) {
                setScrolling(true);
                if (delta > 0) {
                    scroll(1);
                } else if (delta < 0) {
                    scroll(-1);
                }

                setTimeout(() => {
                    setScrolling(false);
                }, 800);
            }
        };

        window.addEventListener('wheel', handleWheelScroll, {passive: false});

        return () => {
            window.removeEventListener('wheel', handleWheelScroll);
        };
    }, [scrolling]);
    const scroll = (delta) => {
        const cardsArray = cardsRef.current;
        const currentPosition = cardsArray.findIndex(
            (cardRef) => cardRef && cardRef.getBoundingClientRect().top >= 0
        );

        let newIndex = currentPosition + delta;
        if (newIndex >= 0 && newIndex < cardsArray.length) {
            cardsArray[newIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveIndex(newIndex);
            localStorage.setItem('activeIndex', newIndex.toString());
        }
    };

    const handleNavigationClick = (index) => {
        cardsRef.current[index].scrollIntoView({behavior: 'smooth', block: 'start'});
        setActiveIndex(index);
        localStorage.setItem('activeIndex', index); // Сохраняем индекс в localStorage
    };
    const handleToggle = () => {
        const newLanguage = !isEnglish ? 'english' : 'russian';
        setIsEnglish(!isEnglish);
        localStorage.setItem('language', newLanguage); // Сохраняем язык в localStorage
    };
    const handleScroll = () => {
        if (!scrolling) {
            const currentPosition = cardsRef.current.findIndex((cardRef) => cardRef.getBoundingClientRect().top >= 0);
            setActiveIndex(currentPosition);
            localStorage.setItem('activeIndex', currentPosition.toString()); // Преобразовываем число в строку
        }
    };

    return (<div className={styles.scrollContainer} onScroll={handleScroll}>
        {cards.map((cardTitle, index) => (<div key={index} ref={(ref) => (cardsRef.current[index] = ref)}>
            <HomePageCard
                title={cardData[index].title}
                description={cardData[index].description}
                technologies={cardData[index].technologies}
                image={cardData[index].imagePath}
                customStyles={cardData[index].customStyles}
            />
        </div>))}
        <div className={styles.navigation}>
            <button onClick={handleToggle}
                    className={isEnglish ? styles.english : styles.russian}>{isEnglish ? 'EN' : 'RU'}</button>
            {cards.map((_, index) => (<button key={index} onClick={() => handleNavigationClick(index)}
                                              className={index === activeIndex ? styles.active : ''}>
                {/* Здесь вы можете добавить иконки или текст для кнопок */}
                {index + 1}
            </button>))}
        </div>
    </div>);
};

export default HomePage;
