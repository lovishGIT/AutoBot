import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Playground from './pages/playground';
import NotFound from './pages/NotFound';
import { Login } from './pages/Login';
import UserProvider from './context/user.context';

function App() {
    return (
        <>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/playground" element={<Playground />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </>
    );
}

export default App;
