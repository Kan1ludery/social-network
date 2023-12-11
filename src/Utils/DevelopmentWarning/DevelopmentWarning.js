import React, {useEffect, useState} from 'react';
import styles from './DevelopmentWarning.module.css'; // Подключаем файл стилей

const DevelopmentWarning = () => {
    const [showWarning, setShowWarning] = useState(true); // Состояние для отображения предупреждения

    useEffect(() => {
        // Показываем предупреждение при загрузке страницы
        setShowWarning(true);
    }, []);

    const handleCloseWarning = () => {
        setShowWarning(false); // Закрыть предупреждение
    };
    return (
        <>
            {showWarning &&
                <div className={styles.developmentWarning}>
                    <span className={styles.close} onClick={handleCloseWarning}>&times;</span>
                    <div className={styles.warningContent}>
                        <h2>Page in development</h2>
                        <p>This page is still under development. Sorry for the inconvenience.</p>
                        <img src="/assets/gifs/inDevelopment/typing.gif" alt="" className={styles.img}/>
                    </div>
                </div>
            }
        </>

    );
};

export default DevelopmentWarning;
