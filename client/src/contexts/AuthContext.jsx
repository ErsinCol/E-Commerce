import {createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = (userData) => {
        setUser(userData.user);
        setLoggedIn(true);
    }

    const providedValues = {
        user,
        loggedIn,
        login,
    }

    return (
        <AuthContext.Provider value={providedValues} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);