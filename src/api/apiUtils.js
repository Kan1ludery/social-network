// apiUtils.js
import axios from "axios";
import jwtDecode from 'jwt-decode';
import getUserInfoFromToken from "../Utils/Functions/getUserInfoFromToken";
import {baseServerURL} from "./api";

const instance = axios.create({
    baseURL: `${baseServerURL}/api`, // URL сервера API
    withCredentials: true,
});

export const logoutAndRedirectToLogin = async () => {
    // Очистка localStorage и других данных аутентификации.
    localStorage.removeItem('token');
    // Вызов метода /logout на сервере для удаления httpOnly кук.
    try {
        await instance.post('/logout');
    } catch (error) {
        // Обработка ошибки, если что-то пошло не так при вызове /logout на сервере.
        console.error('Logout error:', error);
    }

    // Перенаправление пользователя на страницу входа.
    window.location.href = '/login';
};

// Функция для проверки срока действия токена
function isTokenExpired(token) {
    const decodedToken = jwtDecode(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTimestamp;
}
// Функция для проверки аутентификации пользователя
export function isAuthenticated() {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired(token);
}

// Запрос на обновление токена
export async function refreshAuthToken() {
    try {
        if (!!getUserInfoFromToken()) {
            const response = await instance.post('/refresh-token');
            const {newToken} = response.data;
            // Сохранить новый JWT-токен
            localStorage.setItem('token', newToken);
            window.location.reload()
            return newToken
        }
        return null
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        // Обработать ошибку обновления токена здесь
        return null;
    }
}

// Смена заголовка при новом токене
export async function getAuthToken() {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    const newToken = await refreshAuthToken();
    if (!newToken) {
        await logoutAndRedirectToLogin();
        return null; // Возвращаем null, чтобы показать, что токен не был получен
    }
    // Обновляем заголовок для всех последующих запросов
    return { headers: { Authorization: `Bearer ${newToken}` } };
}