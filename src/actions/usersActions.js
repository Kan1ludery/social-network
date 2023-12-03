// Действия для вашего редюсера
import {
    GET_RANDOM_USERS,
    LOGOUT_USER,
    SET_AUTH_STATUS, SET_DESCRIPTION,
    SET_ERROR, SET_ERROR_MESSAGE,
    SET_LOADING,
    SET_ONLINE_USERS,
    SET_OTHER_USER_PROFILE, SET_SOCIAL_LINK,
    SET_USER,
    UPDATE_SOCIAL_LINKS, UPDATE_TOKEN,
    UPDATE_USER_IMAGE,
} from "../reducers/userReducer";
import {usersAPI} from "../api/api";

export const setRandomUsers = (randomUsers) => ({
    type: GET_RANDOM_USERS, payload: randomUsers
})
export const setUser = (user) => ({
    type: SET_USER, payload: user
})
export const setOtherUser = (otherUser) => ({
    type: SET_OTHER_USER_PROFILE, payload: otherUser
})
export const setSocialLink = (type, text) => ({
    type: SET_SOCIAL_LINK,
    payload: { type, text },
});
export const setSocialLinks = (updatedLinks) => ({
    type: UPDATE_SOCIAL_LINKS,
    payload: updatedLinks,
});
export const setOnlineUsers = (onlineUsers) => ({
    type: SET_ONLINE_USERS, payload: onlineUsers
})
export const logoutUser = () => ({
    type: LOGOUT_USER,
});

export const setAuthStatus = (auth) => ({
    type: SET_AUTH_STATUS,
    payload: auth
})
export const updateUserImage = (newImage) => {
    return {
        type: UPDATE_USER_IMAGE,
        payload: newImage,
    };
};
export const setDescription = (newDescription) => ({
    type: SET_DESCRIPTION,
    payload: newDescription,
});
export const updateToken = (newToken) => {
    return {
        type: UPDATE_TOKEN,
        payload: newToken,
    };
};
export const setLoading = (isLoading) => ({
    type: SET_LOADING, payload: isLoading
})
export const setError = (error) => ({
    type: SET_ERROR, payload: error
})
// Действие для установки сообщения об ошибке
export const setErrorMessage = (message) => ({
    type: SET_ERROR_MESSAGE,
    payload: message,
});
export const getUserProfile = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const profileData = await usersAPI.getUserProfile();
        dispatch(setUser(profileData));
        console.log('profileData', profileData)
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error))
        console.error('Ошибка при получении данных профиля:', error);
        dispatch(setLoading(false))
    }
};
export const getOtherUserProfile = (username) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await usersAPI.getOtherUserProfile(username);
        console.log('otherUserProfile(orminehehe)', response)
        dispatch(setOtherUser(response));
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error))
        console.error('Error fetching other user profile:', error);
        dispatch(setLoading(false))
    }
};

export const uploadImage = (formData) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await usersAPI.uploadImage(formData);
        dispatch(updateUserImage(response.fileName));
        dispatch(setLoading(false))
    } catch (error) {
        console.error('Произошла ошибка при отправке файла', error);
        dispatch(setLoading(false))
    }
};
export const getRandomUsersInfo = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await usersAPI.getRandomUsers();
        console.log(response)
        dispatch(setRandomUsers(response));
        dispatch(setLoading(false))
    } catch (error) {
        console.error('Произошла ошибка при отправке файла', error);
        dispatch(setLoading(false))
    }
};
export const updateSocialLinks = (activeIcon, inputValue) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const response = await usersAPI.updateSocialLink(activeIcon, inputValue);
        console.log(response, 'GDLFGKSDGFKDGKDKSGKDGGKD')
        dispatch(setSocialLinks(response));
        dispatch(setErrorMessage('')); // Очищаем сообщение об ошибке
        dispatch(setLoading(false))
    } catch (error) {
        const errorPayload = {};
        errorPayload[activeIcon] = '';
        dispatch(setErrorMessage(error.response.data.error))
        dispatch(setSocialLinks(errorPayload))
        console.error('Произошла ошибка при отправке файла', error);
        dispatch(setLoading(false))
    }
};
export const updateProfileDescription = (newDescription) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true)); // Устанавливаем флаг загрузки
            const response = await usersAPI.updateDescription(newDescription);
            console.log(response)
            dispatch(setDescription(response.newDescription)); // Обновляем описание в хранилище
            dispatch(setLoading(false)); // Сбрасываем флаг загрузки
        } catch (error) {
            dispatch(setErrorMessage(error.response.data.error)); // Устанавливаем сообщение об ошибке
            console.error('Произошла ошибка при обновлении описания', error);
            dispatch(setLoading(false)); // Сбрасываем флаг загрузки
        }
    };
};