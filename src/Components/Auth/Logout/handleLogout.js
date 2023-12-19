import {authAPI} from "../../../api/api";
import {logoutUser, setAuthStatus} from "../../../actions/usersActions";
async function handleLogout(navigate, dispatch) {
    try {
        // Выполняем запрос на сервер для выхода
        await authAPI.logout();
        // Удаляем локальные данные аутентификации на клиенте
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        dispatch(logoutUser());
        dispatch(setAuthStatus(false))
        // Перенаправляем пользователя на страницу входа или куда угодно еще
        navigate('/login');
        // Перезагружаем страницу
        window.location.reload();
    } catch (error) {
        console.error('Ошибка при выходе:', error);
    }
}
export default handleLogout