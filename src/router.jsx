/**
 * Cấu hình router chính của app.
 * Kiến thức áp dụng:
 * - `createBrowserRouter` và nested routes
 * - `Outlet` thông qua `Layout`
 * - Dynamic route `product/:id`
 */

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
        // Layout dùng chung cho toàn bộ app.
        path: "/",
        element: <Layout />,
        children: [
            {
                // Trang mặc định.
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "menu",
                element: <Menu />,
            },
            {
                // Route động cho trang chi tiết sản phẩm.
                path: "product/:id",
                element: <ProductDetail />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
        ],
    },
]);
