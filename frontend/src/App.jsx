import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import UserProjectDashboard from './pages/projects';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProjectDashboard from './pages/projectDetails';
import { UserProvider } from './context/user.context';

function App() {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/projects"
                            element={<UserProjectDashboard />}
                        />
                        <Route
                            exact
                            path="/project/:id"
                            element={<ProjectDashboard />}
                        />
                        <Route
                            exact
                            path="/login"
                            element={<Login />}
                        />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <ToastContainer
                    position="top-right"
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
