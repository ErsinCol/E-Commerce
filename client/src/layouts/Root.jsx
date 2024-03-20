import Navbar from "../components/Navbar/index.jsx";
import {Outlet} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthContext.jsx";
import {BasketProvider} from "../contexts/BasketContext.jsx";

export default function Root(){
    return (
        <>
            <AuthProvider>
                <BasketProvider>
                    <Navbar />
                    <div id="content">
                        <Outlet />
                    </div>
                </BasketProvider>
            </AuthProvider>
        </>
    )
}