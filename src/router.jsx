/**
 * Router chinh cua app.
 * Kien thuc ap dung:
 * - createBrowserRouter + nested routes
 * - Outlet thong qua Layout
 * - Dynamic route: product/:id
 */

import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";

export const router = createBrowserRouter([
    {
        // Layout chung cho toàn bộ trang.
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
                // Dynamic route cho trang chi tiet san pham.
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
            {
                // 404 fallback.
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
