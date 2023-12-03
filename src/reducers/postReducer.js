const SET_POST_BACKGROUND = 'SET_POST_BACKGROUND';

const initialState = {
    postBackgrounds: {}, // Объект, хранящий фоновые изображения для каждого поста
    placeholderImage: '/assets/img/main/post/placeholder.png', // URL заглушки
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POST_BACKGROUND:
            const { postId, imageUrl } = action.payload;
            const updatedPostBackgrounds = {
                ...state.postBackgrounds,
                [postId]: imageUrl || state.placeholderImage, // Если imageUrl пустой, используем заглушку
            };

            return {
                ...state,
                postBackgrounds: updatedPostBackgrounds,
            };
        default:
            return state;
    }
};

export default postReducer;
