// api.js
import axios from "axios";
import {getAuthToken} from "./apiUtils";

export const baseServerURL = 'https://yomessage-api.ru'
// export const baseServerURL = 'http://localhost:5050'
const instance = axios.create({
    baseURL: `${baseServerURL}/api`, // URL сервера API
    withCredentials: true,
});
const createAuthHeaderConfig = async () => {
    const token = await getAuthToken();
    if (token) {return token}
    throw new Error('Ошибка в получении токена')
};
const getCSRFToken = async () => {
    const response = await instance.get('/getCsrfToken');
    const {CSRFToken} = response.data
    instance.defaults.headers.post['X-CSRF-Token'] = CSRFToken;
    return CSRFToken
};

// Получение списка пользователей
export const usersAPI = {
    async getRandomUsers() {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/getRandomUsers`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },
    async resendVerificationEmail(userId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post(`/resendVerificationEmail`, {userId},{headers});
            return response.data;
        } catch (error) {
            console.error('Ошибка при подтверждении почты:', error);
            throw error
        }
    },
    async getFriends() {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get('/friends', {headers});
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },
    async getUserProfile() {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get('/profile', {headers});
            return response.data;
        } catch (error) {
            console.error('Error getting profile data:', error);
            throw error;
        }
    },
    async getOtherUserProfile(username) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/profile/${username}`, {headers});
            return response.data;
        } catch (error) {
            console.error('Error getting profile data:', error);
            throw error;
        }
    },
    async saveState(isCompressed) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post('/updateStates', {isCompressed},{headers});
            return response.data;
        } catch (error) {
            console.error('Error getting states array:', error);
            throw error;
        }
    },
    async uploadImage(formData) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post('/uploadImage', formData,{headers});
            return response.data;
        } catch (error) {
            console.error('Error getting image from the server:', error);
            throw error;
        }
    },
    async updateSocialLink(activeIcon, inputValue) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.patch(`/updateSocialLinks`, {activeIcon, inputValue},{headers});
            return response.data;
        } catch (error) {
            console.error('Error updating links:', error);
            throw error;
        }
    },
    async updateDescription(newDescription) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.patch(`/updateProfileDescription`, {newDescription}, {headers});
            return response.data;
        } catch (error) {
            console.error('Error updating links:', error);
            throw error;
        }
    },
}

export const messagesAPI = {
    // Код для поиска друзей
    async getSearchFriends(values) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/friends-search?query=${values}`, {headers});
            return response.data;
        } catch (error) {
            console.error('Error finding users:', error);
            throw error;
        }
    },
    // Код для добавления друга
    async addFriendRequest(friendId){
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post(`/addFriendRequest`, {friendId},{headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при создании заявки пользователем в друзья:', error);
            throw error
        }
    },
    async getFriendRequests(){
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/getFriendsRequests`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при выводе заявок в друзья:', error);
        }
    },
    async acceptFriendRequest(friendId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post(`/acceptFriendRequest`, {friendId}, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при добавлении пользователя в друзья:', error);
        }
    },
    async rejectFriendRequest(friendId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.delete(`/rejectFriendRequest/${friendId}`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при удалении пользователя из заявок:', error);
        }
    },
    async deleteFriendship(userId, friendId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.delete(`/deleteFriendship/${userId}/${friendId}`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при удалении пользователя из заявок:', error);
        }
    },

    async getChatList() {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/getChats`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при создании списка чатов:', error);
        }
    },
    async getChatInfo(chatId, from, to) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/getChatInfo/${chatId}/${from}/${to}`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },
    async createChat(randomUserId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post(`/createChat`, {randomUserId},{headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },
    async deleteChat(chatId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.delete(`/deleteChat/${chatId}`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },
    async myDeletedChats() {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.get(`/myDeletedChats`, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },
    async restoreAccessToChat(chatId, otherUserId) {
        try {
            const config = await createAuthHeaderConfig();
            const headers = config.headers ? config.headers : {};
            const response = await instance.post(`/restoreAccessToChat`, {chatId, otherUserId}, {headers});
            return response.data
        } catch (error) {
            console.error('Ошибка при получении сообщений:', error);
        }
    },

}
export const authAPI = {
    async login({email, password}) {
        try {
            await getCSRFToken(); // Получаем CSRF-токен перед отправкой запроса на логин
            const response = await instance.post('/login', {email, password});
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error; // Перебросить ошибку, чтобы другие части кода могли её обработать, если это необходимо
        }
    },
    async register({username, email, password}) {
        try {
            await getCSRFToken(); // Получаем CSRF-токен перед отправкой запроса на регистрацию
            const response = await instance.post('/register', {username, email, password});
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error; // Перебросить ошибку, чтобы другие части кода могли её обработать, если это необходимо
        }
    },
    async logout() {
        try {
            return instance.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}