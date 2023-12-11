import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import './index.css';
import './scrollbar.css'
import AppContainer from "./AppContainer";

// React.StrictMode может вызывать 2 запроса на сервер на этапе разработки
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);


