import {createContext, useContext, useEffect, useState} from "react";
import AuthAPI from "../apis/AuthAPI.js";
import {Flex, Spinner} from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function fetchMe(){
            try{
                const response = await AuthAPI.Me();
                setUser(response);
                setIsLoggedIn(true);
                setIsLoading(false);
            }catch(e){
                console.error((e));
                setIsLoading(false);
            }
        }

        fetchMe();
    }, [])

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData.user);
        localStorage.setItem("access-token", userData.accessToken);
        localStorage.setItem("refresh-token", userData.refreshToken);
    }

    const logout = async (cb) => {
        try{
            setIsLoggedIn(false);
            setUser(null);

            await AuthAPI.Logout();

            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");

            cb();
        }catch(e){
            console.error(e);
        }
    }

    const providedValues = {
        user,
        isLoggedIn,
        login,
        logout,
    }

    if(isLoading){
        return (
            <Flex alignItems="center" justifyContent="center" height="100vh">
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Flex>
        )
    }

    return (
        <AuthContext.Provider value={providedValues} >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);