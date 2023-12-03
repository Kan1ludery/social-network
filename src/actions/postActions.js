// actions.js Пока не используется.
export const SET_POST_BACKGROUND = 'SET_POST_BACKGROUND';

export const setPostBackground = (postId, imageUrl) => {
    return {
        type: SET_POST_BACKGROUND,
        payload: { postId, imageUrl },
    };
};