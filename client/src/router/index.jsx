import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Root from "../layouts/Root.jsx";
import ErrorPage from "../pages/Error/index.jsx";
import Products, {loader as productListLoader} from "../pages/Products/index.jsx";
import Signin from "../pages/Auth/Signin/index.jsx";
import Register from "../pages/Auth/Register/index.jsx";
import ProductDetail, {loader as productDetailLoader} from "../pages/ProductDetail/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productListLoader,
            },
            {
                path: "/product/:productId",
                element: <ProductDetail />,
                loader: productDetailLoader,
                errorElement: <h2>Product Not Found</h2>
            },
            {
                path: "signin",
                element: <Signin />
            },
            {
                path: "register",
                element: <Register />,
            }
        ]
    }
]);

export default router;