import React from 'react';
import styles from './Messages.module.css';
import Search from "../../Utils/SearchComponent/Search";
import ChatInfo from "./Dialogue/ChatInfo";
import Message from "./Message/Message";
import RequestsPage from "./RequestsPage/RequestsPage";
import MessagesForm from "./MessagesForm/MessagesForm";
import ChatList from "./ChatList/ChatList";
import Loading from "../../Utils/Loading/Loading";
import CreateChat from "./СreateChat/CreateChat";
import {updateSearchModal} from "../../actions/messagesActions";

const Messages = ({
                      filteredChatList,
                      activeChat,
                      messageContainer,
                      isLoading,
                      usersRequests,
                      webSocket,
                      handleChatClick,
                      dispatch,
                      isSearchModalOpen,
                      onlineUsers,
                      handleTabClick,
                      activeTab,
                      handleSearchChange
                  }) => {
    const requests = usersRequests.requestsCount > 0 ? `(${usersRequests.requestsCount})` : ''


    return (<div className={styles.container_messages}>
        <div className={styles.container_messages_left}>
            {/** Поиск для друзей (в разработке)*/}
            <div className={styles.container_search}>
                <Search className={styles.search} placeholder={'Type to search'} id={'search_messages'} type={'input'}
                        onChange={handleSearchChange}/>
                <span className={styles.icon}><i></i></span>
            </div>
            {/** Контейнер для кнопок messages/requests */}
            <div className={styles.container_MessagesRequests}>
                <button className={styles.button_messages}
                        onClick={() => handleTabClick('messages')}>Messages
                </button>
                <button className={styles.button_requests}
                        onClick={() => handleTabClick('requests')}>Requests {requests}
                </button>
            </div>
            {/** Переключение вкладки messages/requests */}
            {activeTab === 'messages' ? (<div>
                {/** Создание нового чата и список чатов*/}
                <button onClick={() => dispatch(updateSearchModal(true))}
                        className={styles.plusButton}>Create new chat
                </button>
                {isSearchModalOpen && <CreateChat onlineUsers={onlineUsers} isSearchModalOpen={isSearchModalOpen}/>}
                {isLoading === false ? <ChatList chatList={filteredChatList} handleChatClick={handleChatClick}
                                                 onlineUsers={onlineUsers}/> : <Loading/>}
            </div>) : (isLoading === false ?
                <RequestsPage usersRequestList={usersRequests} isSearchModalOpen={isSearchModalOpen} /> : <Loading/>)}
        </div>
        {/** Если мы выбрали чат, отобразим его информацию */}
        {activeChat.chatId ? <div className={styles.container_messages_right}>
            <ChatInfo chatData={activeChat}/>
            <div className={styles.inputContainer}>
                <div className={styles.messageContainer} ref={messageContainer}>
                    {activeChat.messages.map((message) => (<Message key={message.timestamp} message={message}
                                                                    profileImage={activeChat.profileImage}
                                                                    otherUsername={activeChat.username}/>))}
                </div>
                <MessagesForm webSocket={webSocket} chatData={activeChat}/>
            </div>
        </div> : <div className={styles.noChatMessage}>Pick who you'd like to write to</div>}
    </div>);
};

export default Messages;
