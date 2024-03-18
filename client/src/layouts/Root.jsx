import Navbar from "../components/Navbar/index.jsx";
import {Outlet} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext.jsx";

export default function Root(){
    return (
        <>
            <AuthProvider>
                <Navbar />
                <div id="content">
                    <Outlet />
                </div>
            </AuthProvider>
        </>
    )
}