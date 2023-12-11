import React, {useRef} from 'react';
import styles from './Test.module.css'; // Подключаем файл стилей
import soundFile from './bananchiki.mp3';
import DevelopmentWarning from "../DevelopmentWarning/DevelopmentWarning"; // Импортируем звуковой файл

const Test = () => {
    const audioRef = useRef(null);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className={styles.container}>
            <DevelopmentWarning />
            <div className={styles.container_secret}>
                <img src="/assets/img/nonExistingPage/monke.png" alt="" className={styles.img} onClick={playSound}/>
                <audio ref={audioRef} src={soundFile} />
            </div>
        </div>
    );
};

export default Test;
