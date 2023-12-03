import { combineReducers } from 'redux';
import postReducer from '../reducers/postReducer';
import navigationReducer from "../reducers/navigationReducer";
import messagesReducer from "../reducers/messagesReducer";
import userReducer from "../reducers/userReducer"; // Импорт reducer

const rootReducer = combineReducers({
    postReducer,
    navigationReducer,
    messagesReducer,
    userReducer,
    // Другие редюсеры...
});

export default rootReducer;
