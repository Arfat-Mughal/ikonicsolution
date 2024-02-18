import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup"
import Login from "./components/login";
import {Terms} from "./components/terms";
import Privacy from "./components/privacy";
import Contact from "./components/contact";
import ResetPassword from "./components/resetpassword";
import Pagenotfound from "./components/Pagenotfound";
import Profile from "./components/profile";
import Createpassword from "./components/createpassword";
import {TOKEN} from "./config/constants";

function PrivateRoute({children}) {
    return localStorage.getItem(TOKEN) ? children : <Navigate to="/login"/>;
}

function UserLoggedIn({children}) {
    return localStorage.getItem(TOKEN)  ? <Navigate to="/"/> : children;
}

const CustomRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={
                    <UserLoggedIn>
                        <Signup/>
                    </UserLoggedIn>}/>
                <Route exact path="/user/:id/profile" element={
                    <PrivateRoute>
                        <Profile/>
                    </PrivateRoute>}/>
                <Route exact path="/login" element={
                    <UserLoggedIn>
                        <Login/>
                    </UserLoggedIn>}/>
                <Route exact path="/terms" element={<Terms/>}/>
                <Route exact path="/privacy" element={<Privacy/>}/>
                <Route exact path="/contact" element={<Contact/>}/>
                <Route exact path="/resetpassword" element={<ResetPassword/>}/>
                <Route exact path="/reset-password/:token" element={<Createpassword/>}/>
                <Route path="*" element={<Pagenotfound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default CustomRoutes;