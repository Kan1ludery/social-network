import { useSelector } from 'react-redux';

const useCurrentUser = () => {
    const currentUser = useSelector((state) => state.userReducer.user);
    const {_id: currentUserId, email, username, profile} = currentUser

    return {currentUserId, email, username, profile};
};

export default useCurrentUser