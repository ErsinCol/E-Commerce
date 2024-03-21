import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

export default function Protected({children}){
    const {isLoggedIn} = useAuth();

    switch (isLoggedIn){
        case true:
            return children;
        case false:
            return <Navigate to="/signin" />
    }
}