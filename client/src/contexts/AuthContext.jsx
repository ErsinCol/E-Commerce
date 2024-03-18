import {createContext, useContext, useEffect, useState} from "react";
import AuthAPI from "../apis/AuthAPI.js";
import {Flex, Spinner} from "@chakra-ui/react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        async function fetchMe(){
            try{
                const response = await AuthAPI.Me();
                setUser(response);
                setLoggedIn(true);
                setIsLoading(false);
            }catch(e){
                console.error((e));
                setIsLoading(false);
            }
        }

        fetchMe();
    }, [])

    const login = (userData) => {
        setUser(userData.user);
        setLoggedIn(true);
        localStorage.setItem("access-token", userData.accessToken);
        localStorage.setItem("refresh-token", userData.refreshToken);
    }

    const providedValues = {
        user,
        loggedIn,
        login,
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