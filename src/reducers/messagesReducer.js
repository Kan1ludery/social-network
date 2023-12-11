// messagesReducer.js
export const SET_USERS_REQUESTS = 'SET_USERS_REQUESTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_CHAT_LIST = 'SET_CHAT_LIST'
export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST'
export const DELETE_FRIEND_REQUEST = 'DELETE_FRIEND_REQUEST'
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT'
export const UPDATE_LAST_MESSAGE = 'UPDATE_LAST_MESSAGE'
export const UPDATE_MODAL_STATE = 'UPDATE_MODAL_STATE'
export const SCROLL_CHAT = 'SCROLL_CHAT'
export const ADD_SENT_MESSAGE = 'ADD_SENT_MESSAGE';
export const DELETE_USER_CHAT = 'DELETE_USER_CHAT';

const initialState = {
    usersRequests: [], // Список заявок пользователей
    isLoading: false, // Флаг загрузки
    searchResults: [], // Результаты поиска пользователей
    chatList: [], // Список чатов
    isSearchModalOpen: false, // Регулятор модального окна
    activeChat: {
        chatId: null, // Идентификатор активного чата (null, если нет активного чата)
        messages: [], // Сообщения активного чата
        currentStatus: false, // Статус пользователя online/offline
    },
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_REQUESTS:
            return {...state, usersRequests: action.payload};
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_SEARCH_RESULTS:
            return {...state, searchResults: action.payload};
        case SET_CHAT_LIST:
            return {...state, chatList: action.payload}
        case ADD_FRIEND_REQUEST:
            const updatedRequestsAdd = state.usersRequests.usersRequests.filter((request) => request._id !== action.payload.friendId)
            return {
                ...state, usersRequests: updatedRequestsAdd,
            };
        case DELETE_FRIEND_REQUEST:
            // Фильтруем массив и удаляем запись с заданным friendId
            const updatedRequestsDelete = state.usersRequests.usersRequests.filter(request => request._id !== action.payload.friendId);
            return {
                ...state, usersRequests: updatedRequestsDelete,
            };
        case DELETE_USER_CHAT:
            const updatedChatList = state.chatList.filter(chat => chat.chatId !== action.payload);
            return {
                ...state,
                chatList: updatedChatList,
            };
        case SET_ACTIVE_CHAT:
            return {
                ...state,
                activeChat: {
                    chatId: action.payload.chatId,
                    messages: action.payload.messages,
                    username: action.payload.username,
                    profileImage: action.payload.profileImage,
                    currentStatus: action.payload.status,
                    targetId: action.payload.targetId,
                },
            };
        case SCROLL_CHAT:
            // Проверяем, что у нас есть активный чат
            if (state.activeChat.chatId === null) {
                return state; // Если активного чата нет, не обновляем состояние
            }
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    messages: [...state.activeChat.messages, ...action.payload],
                },
            };
        case ADD_SENT_MESSAGE:
            return {
                ...state,
                activeChat: {
                    ...state.activeChat,
                    messages: [action.payload, ...state.activeChat.messages],
                },
            };
        case UPDATE_LAST_MESSAGE:
            const chatToUpdate = state.chatList.find(chat => chat.chatId === action.chatId);
            if (chatToUpdate) {
                chatToUpdate.lastMessage = action.rest;
            }
            return {
                ...state,
                chatList: [...state.chatList],
            };
        case UPDATE_MODAL_STATE:
            return {
                ...state,
                isSearchModalOpen: action.payload,
            };

        default:
            return state;
    }
};

export default messagesReducer;