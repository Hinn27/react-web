/**
 * Cấu hình React Router Dom:
 * - Sử dụng createBrowserRouter
 * - Định nghĩa các Route với path và element
 * - Sử dụng Outlet trong Layout component cho nested routes
 * - Hỗ trợ client-side routing không cần tải lại trang
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

/**
 * createBrowserRouter - Cách cấu hình router được khuyến nghị
 * Nhận vào mảng cấu hình các Route
 * Mỗi Route định nghĩa: path, element, children (nested routes)
 */
export const router = createBrowserRouter([
    {
        // Layout chính chứa Navbar, Footer và Outlet cho nested routes
        path: "/",
        element: <Layout />,
        // errorElement có thể thêm để xử lý lỗi
        children: [
            {
                // Route mặc định
                index: true,
                element: <Home />,
            },
            {
                // đăng nhập
                path: "login",
                element: <Login />,
            },
            {
                // đăng ký
                path: "register",
                element: <Register />,
            },
            {
                // thực đơn
                path: "menu",
                element: <Menu />,
            },
            {
                // chi tiết sản phẩm - sử dụng dynamic route parameter :id
                // useParams() hook để lấy giá trị id
                path: "product/:id",
                element: <ProductDetail />,
            },
            {
                // giỏ hàng
                path: "cart",
                element: <Cart />,
            },
            {
                // thanh toán
                path: "checkout",
                element: <Checkout />,
            },
            {
                // Route 404
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
