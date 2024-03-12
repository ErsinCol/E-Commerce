import Navbar from "../components/Navbar/index.jsx";
import {Outlet} from "react-router-dom";

export default function Root(){
    return (
        <>
            <Navbar />
            <div id="content">
                <Outlet />
            </div>
        </>
    )
}