import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Root from "../layouts/Root.jsx";
import ErrorPage from "../error-page.jsx";
import Products from "../pages/Products/index.jsx";
import Login from "../pages/Auth/Login/index.jsx";
import Register from "../pages/Auth/Register/index.jsx";
import ProductDetail from "../pages/ProductDetail/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import Protected from "../pages/Protected.jsx";
import Basket from "../pages/Basket/index.jsx";
import MyOrders from "../pages/MyOrders/index.jsx";
import Admin from "../pages/Admin/index.jsx";
import AdminHome from "../pages/Admin/Home/index.jsx";
import AdminOrders from "../pages/Admin/Orders/index.jsx";
import AdminProducts from "../pages/Admin/Products/index.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Products />,
            },
            {
                path: "/product/:productId",
                element: <ProductDetail />,
                errorElement: <h2>Product Not Found</h2>
            },
            {
                path: "signin",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "profile",
                element: <Protected><Profile/></Protected>
            },
            {
                path: "my-orders",
                element: <Protected><MyOrders /></Protected>,
            },
            {
                path: "admin",
                element: <Protected isAdmin={true}><Admin /></Protected>,
                children: [
                    {
                        index: true,
                        element: <AdminHome />,
                    },
                    {
                        path: "orders",
                        element: <AdminOrders />,
                    },
                    {
                        path: "products",
                        element: <AdminProducts />,
                    }
                ]
            },
            {
                path: "basket",
                element: <Basket />
            }
        ]
    }
]);

export default router;