import jwtDecode from 'jwt-decode';

const getUserInfoFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const decodedToken = jwtDecode(token);
        const { userId, emailVerified} = decodedToken;

        if (!userId) {
            console.error('JWT токен не содержит необходимой информации о пользователе.');
            return null;
        }

        return { userId, emailVerified };
    } catch (error) {
        console.error('Ошибка при декодировании JWT токена:', error);
        return null;
    }
};

export default getUserInfoFromToken
