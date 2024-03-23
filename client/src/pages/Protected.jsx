import {Navigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

export default function Protected({children, isAdmin}){
    const {isLoggedIn, user} = useAuth();

    if(isAdmin && user.role !== "admin"){
        return <Navigate to="/" />
    }

    switch (isLoggedIn){
        case true:
            return children;
        case false:
            return <Navigate to="/signin" />
    }
}

