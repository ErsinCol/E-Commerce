import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Root from "../layouts/Root.jsx";
import ErrorPage from "../pages/Error/index.jsx";
import Products, {loader as productListLoader} from "../pages/Products/index.jsx";
import Login from "../pages/Auth/Login/index.jsx";
import Register from "../pages/Auth/Register/index.jsx";
import ProductDetail, {loader as productDetailLoader} from "../pages/ProductDetail/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import Protected from "../pages/Protected.jsx";
import Basket from "../pages/Basket/index.jsx";
import MyOrders, {loader as myOrdersLoader} from "../pages/MyOrders/index.jsx";
import Admin from "../pages/Admin/index.jsx";
import AdminHome from "../pages/Admin/Home/index.jsx";
import AdminOrders, {loader as  adminOrdersLoader} from "../pages/Admin/Orders/index.jsx";
import AdminProducts, {loader as adminProductsLoader} from "../pages/Admin/Products/index.jsx";

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
                loader: myOrdersLoader,
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
                        loader: adminOrdersLoader,
                    },
                    {
                        path: "products",
                        element: <AdminProducts />,
                        loader: adminProductsLoader,
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