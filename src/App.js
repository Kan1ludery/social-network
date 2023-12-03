import './App.css';
import React, {lazy, Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Loading from "./Utils/Loading/Loading";
import NonExistingPage from "./Components/NonExistingPage/NonExistingPage";
import EmailConfirmation from "./Components/Auth/EmailConfirmation/EmailConfirmation";

const ProfilePage = lazy(() => import("./Components/ProfilePage/ProfilePage"));
const NavigationContainer = lazy(() => import("./Components/NavigationContainer/NavigationContainer"));
const News = lazy(() => import("./Components/News/News"));
const Friends  = lazy(() => import("./Components/FriendsPage/FriendsPage"));
const Login = lazy(() => import("./Components/Auth/Login/Login"));
const Logout = lazy(() => import("./Components/Auth/Logout/Logout"));
const Register = lazy(() => import("./Components/Auth/Register/Register"));
const MessagesContainer = lazy(() => import("./Components/Messages/MessagesContainer"));
const HomePage = lazy(() => import("./Components/HomePage/HomePage"));
const Test = lazy(() => import("./Utils/Test/Test"));

const App = () => (
    <div className="App">
        <BrowserRouter>
            <NavigationContainer/>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path="/profile/:username" element={<ProfilePage/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/messages" element={<MessagesContainer />}/>
                    <Route path="/friends" element={<Friends />}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/emailConfirm" element={<EmailConfirmation />}/>
                    <Route path="*" element={<NonExistingPage />}/>
                    <Route path="/test" element={<Test />}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    </div>
);

export default App;
