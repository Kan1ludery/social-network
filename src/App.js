import './App.css';
import React, {lazy, Suspense} from "react";
import {BrowserRouter} from "react-router-dom";
import Loading from "./Utils/Loading/Loading";
import RoutesWrapper from "./Components/RoutesWrapper/RoutesWrapper";

const NavigationContainer = lazy(() => import("./Components/NavigationContainer/NavigationContainer"));


const App = () => (
    <div className="App">
        <BrowserRouter>
            <NavigationContainer/>
            <Suspense fallback={<Loading/>}>
                <RoutesWrapper />
            </Suspense>
        </BrowserRouter>
    </div>
);

export default App;
