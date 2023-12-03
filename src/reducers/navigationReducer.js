import {usersAPI} from "../api/api";

const TOGGLE_COMPRESSION = 'TOGGLE_COMPRESSION'
const SAVED_STATE = 'SAVED_STATE'
const SET_ACTUAL_COMPRESS = 'SET_ACTUAL_COMPRESS';
const initialState = {
    isCompressed: true,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_COMPRESSION:
            return {
                ...state,
                isCompressed: !state.isCompressed,
            };
        case SAVED_STATE:
            return {
                ...state,
                isCompressed: action.payload,
            };
        case SET_ACTUAL_COMPRESS:
            return {
                ...state,
                isCompressed: action.payload,
            };
        default:
            return state;
    }
};

export const toggleCompression = () => {
    return {
        type: TOGGLE_COMPRESSION,
    };
};
export const savedState = (savedState) => {
    return {
        type: SAVED_STATE,
        payload: savedState
    };
}
export const setActualCompress = (isCompressed) => {
    return {
        type: SET_ACTUAL_COMPRESS,
        payload: isCompressed,
    };
};

// Экшен
export const saveCompressionState = (isCompressed) => async (dispatch) => {
    try {
        dispatch(toggleCompression());
        const statesData = await usersAPI.saveState(isCompressed);
        dispatch(savedState(statesData.isCompressed));
    } catch (error) {
        console.error('Ошибка при сохранении на сервере:', error);
    }
};
export default navigationReducer;
