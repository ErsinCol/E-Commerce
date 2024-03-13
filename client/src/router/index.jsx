import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Root from "../layouts/Root.jsx";
import Products from "../pages/Products/index.jsx";
import Signin from "../pages/Auth/Signin/index.jsx";
import Register from "../pages/Auth/Register/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Products />
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