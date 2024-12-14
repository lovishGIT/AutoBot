import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import UserProjectDashboard from './pages/projects/projects';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserProvider } from './context/user.context';
import ProfilePage from './pages/profile';
import { ProjectProvider } from './context/projects.context';

function App() {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/login"
                            element={<Login />}
                        />
                        <Route
                            exact
                            path="/projects/*"
                            element={<UserProjectDashboard />}
                        />
                        <Route
                            exact
                            path="/profile"
                            element={<ProfilePage />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </UserProvider>
        </>
    );
}

export default App;
