import React from 'react';
import styles from './Post.module.css'
import {useSelector} from "react-redux";
import PostButton from "./PostButton/PostButton";

const Post = ({postId}) => {
    const postBackgrounds = useSelector(state => state.postReducer.postBackgrounds);
    const placeholderImage = useSelector(state => state.postReducer.placeholderImage);
    const backgroundImage = postBackgrounds && postBackgrounds[postId] ? postBackgrounds[postId] : placeholderImage;

    return (<div className={styles.layout_post}>
        <div className={styles.container_post}>
            <div className={styles.container_post_background}>
                <div className={styles.container_top} style={{backgroundImage: `url(${backgroundImage})`}}>
                    <div className={styles.top_account}>
                        <a href="/#" className={styles.top_account_block}>
                            <img className={styles.account_img} src="/assets/img/main/post/accountImg.png"
                                 alt="account_image"/>
                            <div className={styles.account_info}>
                                <span>Cody Fisher</span>
                                <span>1 h</span>
                            </div>
                        </a>
                        <div className={styles.container_top_options}>
                            <button className={styles.top_options}></button>
                        </div>

                    </div>
                </div>

                <div className={styles.container_middle}>
                    {/** TAG COMPONENT (NEED TO BE CREATED) */}
                    <div className={styles.container_tags}>
                        <a href='/#'>#abstraction</a>
                        <a href='/#'>#aesthetic</a>
                        <a href='/#'>#AI</a>
                    </div>
                    <div className={styles.post_name}>
                        Top 10 AI Works
                    </div>

                </div>
                <hr/>
                {/** FAST-BUTTON COMPONENT (NEED TO BE CREATED) */}
                <div className={styles.container_bottom}>
                    <PostButton text={"Like"} iconPath={"/assets/icons/post/like.svg"}/>
                    <PostButton text={"Comment"}  iconPath={"/assets/icons/post/comment.svg"}/>
                    <PostButton text={"Share"} iconPath={"/assets/icons/post/share.svg"}/>
                </div>
            </div>
        </div>
    </div>);
};

export default Post;