import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import EmailConfirmation from "../Auth/EmailConfirmation/EmailConfirmation";
import NonExistingPage from "../NonExistingPage/NonExistingPage";

const ProfilePage = lazy(() => import("../ProfilePage/ProfilePage"));
const News = lazy(() => import("../News/News"));
const Friends = lazy(() => import("../FriendsPage/FriendsPage"));
const Login = lazy(() => import("../Auth/Login/Login"));
const Logout = lazy(() => import("../Auth/Logout/Logout"));
const Register = lazy(() => import("../Auth/Register/Register"));
const MessagesContainer = lazy(() => import("../Messages/MessagesContainer"));
const HomePage = lazy(() => import("../HomePage/HomePage"));
const Test = lazy(() => import("../../Utils/Test/Test"));
const RoutesWrapper = (props) => {
    return (
        <Routes>
                <Route path="/profile/:username" element={<ProfilePage/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/messages" element={<MessagesContainer/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/emailConfirm" element={<EmailConfirmation/>}/>
                <Route path="*" element={<NonExistingPage/>}/>
                <Route path="/test" element={<Test/>}/>
        </Routes>
    );
};

export default RoutesWrapper;