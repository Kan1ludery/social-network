import React from 'react';
import ReactDOM from 'react-dom/client';
import store from "./redux/redux-store";
import {Provider} from "react-redux";
import './index.css';
import './scrollbar.css'
import reportWebVitals from './reportWebVitals';
import AppContainer from "./AppContainer";

// React.StrictMode может вызывать 2 запроса на сервер на этапе разработки
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
