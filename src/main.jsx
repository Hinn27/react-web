/**
 * Điểm khởi chạy của app.
 * Kiến thức áp dụng:
 * - `StrictMode` + `createRoot`
 * - Context Providers (Theme/Auth/Cart)
 * - `RouterProvider` dùng với `createBrowserRouter`
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

/** Bọc app bằng providers và router. */
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
