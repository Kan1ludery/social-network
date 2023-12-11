import React from 'react';
import styles from "./News.module.css";
import History from "./HistoryComponent/History";
import Search from "../../Utils/SearchComponent/Search";
import Post from "./Post/Post";
import DevelopmentWarning from "../../Utils/DevelopmentWarning/DevelopmentWarning";

const News = (props) => {
    return (
        <div className={styles.container_main}>
            <DevelopmentWarning />
            <div className={styles.container_lim}>
                <div className={styles.history_flex}>
                    <History iUrl={'/assets/icons/plus.svg'} isPlus={true}/>
                    <History iUrl={'/assets/img/main/history/history1.svg'}/>
                    <History iUrl={'/assets/img/main/history/history2.svg'}/>
                    <History iUrl={'/assets/img/main/history/history3.svg'}/>
                    <History iUrl={'/assets/img/main/history/history4.svg'}/>
                </div>
                <div className={styles.container_search}>
                    <i className={styles.main_search_icon}></i>
                    <Search className={styles.main_search} placeholder={'What do you wanna tell about?'}
                            id={'main_search'} type={'search'}/>
                </div>
                <div className={styles.container_menu_icons}>
                    <button className={styles.photo}></button>
                    <button className={styles.tag}></button>
                    <button className={styles.detail}></button>
                </div>
                <hr style={{marginTop: '70px'}}/>
            </div>
            <div>
                <Post/>
                <Post/>
            </div>
        </div>
    );
};

export default News;