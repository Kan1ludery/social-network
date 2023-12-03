import React, {useState} from 'react';
import styles from './Messages.module.css';
import Search from "../../Utils/SearchComponent/Search";
import ChatInfo from "./Dialogue/ChatInfo";
import Message from "./Message/Message";
import RequestsPage from "./RequestsPage/RequestsPage";
import MessagesForm from "./MessagesForm/MessagesForm";
import ChatList from "./ChatList/ChatList";
import Loading from "../../Utils/Loading/Loading";
import CreateChat from "./СreateChat/CreateChat";
import {useSelector} from "react-redux";

const Messages = ({
                      chatList,
                      activeChat,
                      messageContainer,
                      isLoading,
                      usersRequests,
                      webSocket,
                      handleChatClick,
                  }) => {
    const [activeTab, setActiveTab] = useState('messages'); // Изначально активен раздел "messages"
    const [isOverlayOpen, setIsOverlayOpen] = useState(false); // Состояние для отображения оверлея
    // Функция для открытия оверлея
    const openOverlay = () => {
        setIsOverlayOpen(true);
    };
    // Функция для закрытия оверлея
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    const {onlineUsers} = useSelector((state) => state.userReducer);
    return (
        <div className={styles.container_messages}>
            <div className={styles.container_messages_left}>
                {/** Поиск для друзей (в разработке)*/}
                <div className={styles.container_search}>
                    <Search className={styles.search} placeholder={'Type to search'} id={'search_messages'}
                            type={'input'}/>
                    <span className={styles.icon}>
                        <i></i>
                    </span>
                </div>
                {/** Контейнер для кнопок messages/requests */}
                <div className={styles.container_MessagesRequests}>
                    <button className={styles.button_messages}
                            onClick={() => handleTabClick('messages')}>messages
                    </button>
                    <button className={styles.button_requests}
                            onClick={() => handleTabClick('requests')}>requests {usersRequests.requestsCount > 0 ? usersRequests.requestsCount : ''}
                    </button>
                </div>
                {/** Переключение вкладки messages/requests */}
                {activeTab === 'messages'
                    ? (
                        <div>
                            <button onClick={openOverlay} className={styles.plusButton}>plus</button>
                            {isOverlayOpen && <CreateChat closeOverlay={closeOverlay}/>}
                            {isLoading === false ? <ChatList chatList={chatList} handleChatClick={handleChatClick} onlineUsers={onlineUsers}/> :
                                <Loading/>}
                        </div>
                    )
                    : (
                        isLoading === false ? <RequestsPage usersRequestList={usersRequests}/> : <Loading/>
                    )}
            </div>
            {/** Если мы выбрали чат, отобразим его информацию */}
            {activeChat.chatId
                ? <div className={styles.container_messages_right}>
                    <ChatInfo chatData={activeChat}/>
                    <div className={styles.inputContainer}>
                        <div className={styles.messageContainer} ref={messageContainer}>
                            {activeChat.messages.map((message) => (
                                <Message key={message.timestamp} message={message}
                                         profileImage={activeChat.profileImage}/>
                            ))}
                        </div>
                        <MessagesForm webSocket={webSocket} chatData={activeChat}/>
                    </div>
                </div>
                : <div className={styles.noChatMessage}>Pick who you'd like to write to</div>
            }
        </div>
    );
};

export default Messages;
