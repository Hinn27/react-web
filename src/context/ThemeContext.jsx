/**
 * ThemeContext.jsx - Context quản lý Theme (Light/Dark Mode)
 *
 * Theo kiến thức React Hooks:
 * - useContext: Cho phép chia sẻ dữ liệu Theme giữa các component
 *   mà không cần truyền props qua từng cấp (tránh props drilling)
 * - useState: Quản lý state mode (light/dark)
 * - useMemo: Ghi nhớ giá trị theme để không tính toán lại không cần thiết
 * - useEffect: Xử lý side effect (có thể dùng để sync với system preference)
 */

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { createAppTheme } from "../theme";

// Tạo Context với giá trị mặc định
const ThemeContext = createContext({
    mode: "light",
    toggleTheme: () => {},
});

/**
 * Custom Hook để sử dụng ThemeContext
 * Đây là pattern phổ biến để truy cập context một cách dễ dàng
 */
export const useThemeMode = () => useContext(ThemeContext);

/**
 * ThemeProvider Component
 * Wrap ứng dụng để cung cấp theme cho tất cả component con
 */
export function ThemeProvider({ children }) {
    // useState với lazy initialization
    // Kiểm tra giờ hiện tại: 18h-6h → tự động bật Dark Mode cho lao động ca đêm
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem("refood-theme-mode");
        if (savedMode) return savedMode;
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6 ? "dark" : "light";
    });

    // Hàm toggle theme
    const toggleTheme = () => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("refood-theme-mode", next);
            return next;
        });
    };

    // useMemo để ghi nhớ theme object, chỉ tính toán lại khi mode thay đổi
    const theme = useMemo(() => createAppTheme(mode), [mode]);

    // useMemo cho context value để tránh re-render không cần thiết
    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline để reset CSS và áp dụng theme cho toàn bộ app */}
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
