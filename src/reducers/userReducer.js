// userReducer.js
export const SET_USER = 'SET_USER'
export const SET_OTHER_USER_PROFILE = 'SET_OTHER_USER_PROFILE'
export const SET_ONLINE_USERS = 'SET_ONLINE_USERS'
export const SET_LOADING = 'SET_LOADING'
export const SET_ERROR = 'SET_ERROR'
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE'
export const LOGOUT_USER = 'LOGOUT_USER';
export const SET_AUTH_STATUS = 'SET_AUTH_STATUS';
export const UPDATE_USER_IMAGE = 'UPDATE_USER_IMAGE'
export const GET_RANDOM_USERS = 'GET_RANDOM_USERS'
export const SET_SOCIAL_LINK = 'SET_SOCIAL_LINK';
export const UPDATE_SOCIAL_LINKS = 'UPDATE_SOCIAL_LINKS';
export const SET_DESCRIPTION = 'SET_DESCRIPTION'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'

const initialState = {
    // Начальное состояние текущего пользователя
    user: {
        profile: {
            profileImage: '',
        }
    }, // Начальное состояние 'другого' пользователя
    otherUser: {
        profile: {
            description: '',
            profileImage: '',
            socialLinks: {},
        }
    },
    onlineUsers: [],
    randomUsers: [],
    socialLinks: [],
    isLoading: false, // Флаг загрузки
    error: null, errorMessage: null, isAuth: false, // Состояние авторизации
    placeholderImage: '/assets/img/main/post/placeholder.png', // URL заглушки
    token: '',
};


// Редюсер
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload};
        case SET_OTHER_USER_PROFILE:
            return {...state, otherUser: action.payload}
        case UPDATE_SOCIAL_LINKS:
            const {otherUser} = state;
            const {profile} = otherUser;
            const updatedProfile = {
                ...profile, socialLinks: {
                    ...profile.socialLinks, ...action.payload,
                },
            };
            return {
                ...state, otherUser: {
                    ...otherUser, profile: updatedProfile,
                },
            };
        case SET_SOCIAL_LINK:
            return {
                ...state, otherUser: {
                    ...state.otherUser, profile: {
                        ...state.otherUser.profile, socialLinks: {
                            ...state.otherUser.profile.socialLinks, [action.payload.type]: action.payload.text,
                        },
                    },
                },
            };
        case SET_ONLINE_USERS:
            return {...state, onlineUsers: action.payload}
        case SET_AUTH_STATUS:
            return {...state, isAuth: action.payload,};
        case LOGOUT_USER:
            return {
                ...state, user: {
                    ...state.user, profile: {
                        profileImage: '',
                    },
                },
            };
        case UPDATE_USER_IMAGE:
            return {
                ...state, user: {
                    ...state.user, profile: {
                        ...state.user.profile, profileImage: action.payload || state.placeholderImage,
                    },
                },
            };
        case UPDATE_TOKEN:
            return {
                ...state,
                token: action.payload,
            }
        case SET_DESCRIPTION:
            return {
                ...state,
                otherUser: {
                    ...state.otherUser,
                    profile: {
                        ...state.otherUser.profile,
                        description: action.payload
                    }
                }
            };
        case SET_LOADING:
            return {...state, isLoading: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case GET_RANDOM_USERS:
            return {
                ...state, randomUsers: action.payload
            }
        default:
            return state;
    }
};

export default userReducer
