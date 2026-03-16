/**
 * main.jsx - Entry Point của ứng dụng React
 *
 * Theo kiến thức ReactJS:
 * - Sử dụng StrictMode để phát hiện các vấn đề tiềm ẩn
 * - createRoot là cách render mới của React 18+
 * - Wrapping với các Context Providers để chia sẻ state toàn cục
 */

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";
import { router } from "./router.jsx";

/**
 * Sử dụng createRoot (React 18+) thay vì ReactDOM.render
 * RouterProvider được sử dụng với createBrowserRouter (khuyến nghị)
 */
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <CartProvider>
                    <RouterProvider router={router} />
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    </StrictMode>
);
