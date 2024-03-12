import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Root from "../layouts/Root.jsx";
import Home from "../pages/Home/index.jsx";
import Signin from "../pages/Auth/Signin/index.jsx";
import Register from "../pages/Auth/Register/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    }
]);

export default router;