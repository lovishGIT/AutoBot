import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    user: {
        email: '',
        fullName: '',
        createdAt: '',
        id: ''
    },
    setUser: (newUser) => {}
});

export default function UserProvider({ children }) {
    const [user, setUser] = useState({
        email: '',
        fullName: '',
        createdAt: '',
        id: '',
    });

    const signOutUser = () => setUser({
        email: '',
        fullName: '',
        createdAt: '',
        id: '',
    });

    return (
        <UserContext.Provider value={{ user, setUser, signOutUser }}>
            {children}
        </UserContext.Provider>
    );
}
