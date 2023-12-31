// messagesActions.js

import {
    ADD_FRIEND_REQUEST,
    ADD_SENT_MESSAGE,
    DELETE_FRIEND_REQUEST,
    DELETE_USER_CHAT,
    SCROLL_CHAT,
    SET_ACTIVE_CHAT,
    SET_CHAT_LIST,
    SET_LOADING,
    SET_SEARCH_RESULTS,
    SET_USERS_REQUESTS,
    UPDATE_LAST_MESSAGE,
    UPDATE_MODAL_STATE
} from '../reducers/messagesReducer';
import {messagesAPI} from "../api/api";


export const setUsersRequests = (usersRequests) => ({
    type: SET_USERS_REQUESTS, payload: usersRequests,
});

export const setLoading = (isLoading) => ({
    type: SET_LOADING, payload: isLoading,
});

export const setSearchResults = (searchResults) => ({
    type: SET_SEARCH_RESULTS, payload: searchResults,
});
export const setChatList = (chatList) => ({
    type: SET_CHAT_LIST, payload: chatList,
});
export const addFriendRequest = (friendId) => ({
    type: ADD_FRIEND_REQUEST, payload: {friendId},
});
export const deleteFriendRequest = (friendId) => ({
    type: DELETE_FRIEND_REQUEST, payload: friendId,
});
export const deleteUserChatId = (chatId) => ({
    type: DELETE_USER_CHAT, payload: chatId,
});
export const setActiveChat = (chatId, messages, username, profileImage, status, targetId) => {
    return {
        type: SET_ACTIVE_CHAT, payload: {
            chatId, messages, username, profileImage, status, targetId
        },
    };
};
export const scrollChat = (messages) => {
    return {
        type: SCROLL_CHAT, payload: messages,
    };
};
export const addSentMessage = (message) => {
    return {
        type: ADD_SENT_MESSAGE, payload: message,
    };
};
export const updateLastMessage = (chatId, rest) => {
    return {
        type: UPDATE_LAST_MESSAGE, chatId, rest
    };
};
export const updateSearchModal = (setModal) => ({
    type: UPDATE_MODAL_STATE, payload: setModal
});

// Асинхронное действие для получения данных из API и обновления Redux-состояния
export const fetchFriendRequests = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const requests = await messagesAPI.getFriendRequests();
        dispatch(setUsersRequests(requests)); // Обновление данных пользователей
        dispatch(setLoading(false)); // Установка состояния загрузки в false
    } catch (error) {
        console.error('Ошибка при получении запросов на дружбу:', error);
        dispatch(setLoading(false)); // Установка состояния загрузки обратно в true случае ошибки
    }
};

export const fetchUsersSearch = (value) => async (dispatch) => {
    try {

    } catch (error) {
        console.error('Ошибка при получении поисковых запросов на дружбу:', error);
        dispatch(setSearchResults([])); // Очищаем результаты поиска
        dispatch(setLoading(false));
    }
}

export const fetchChatList = () => async (dispatch) => {
    try {
        dispatch(setLoading(true)); // Устанавливаем isLoading в true перед запросом
        const response = await messagesAPI.getChatList();
        dispatch(setChatList(response))
        dispatch(setLoading(false));
    } catch (error) {
        console.error('Ошибка при получении чатов пользователя:', error);
        dispatch(setLoading(false));
    }
}
export const acceptFriend = (friendId) => async (dispatch) => {
    try {
        await messagesAPI.acceptFriendRequest(friendId);
        dispatch(addFriendRequest(friendId))
    } catch (error) {
        console.error('Error accepting friend request:', error);
    }
};
export const rejectFriend = (friendId) => async (dispatch) => {
    try {
        await messagesAPI.rejectFriendRequest(friendId);
        dispatch(deleteFriendRequest(friendId))
    } catch (error) {
        console.error('Error rejecting friend request:', error);
    }
};

export const getChatInfo = (chatData, from, to, status, targetId) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const chatInfo = await messagesAPI.getChatInfo(chatData.chatId, from, to);
        const {chatId, profileImage, username, friendId} = chatData
        dispatch(setActiveChat(chatId, chatInfo.messages, username, profileImage, status, friendId));
        dispatch(setLoading(false))
    } catch (error) {
        console.error('Error getting chat information:', error);
    }
};

export const scrollChatThunk = (chatId, from, to) => async (dispatch) => {
    try {
        const newMessages = await messagesAPI.getChatInfo(chatId, from, to);
        dispatch(scrollChat(newMessages.messages));
    } catch (error) {
        console.error('Error while scrolling chat:', error);
    }
};
export const deleteUserChat = (chatId) => async (dispatch) => {
    try {
        await messagesAPI.deleteChat(chatId);
        dispatch(deleteUserChatId(chatId))
    } catch (error) {
        console.error('Error while scrolling chat:', error);
    }
};