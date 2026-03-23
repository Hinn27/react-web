/**
 * Context quản lý theme sáng/tối.
 * Kiến thức áp dụng:
 * - `useState` lưu mode
 * - `useContext` chia sẻ mode/toggle
 * - `useMemo` tạo MUI theme tối ưu
 */

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { createAppTheme } from "../theme";

const ThemeContext = createContext({
    mode: "light",
    toggleTheme: () => {},
});

/** Hook truy cập theme context. */
export const useThemeMode = () => useContext(ThemeContext);

/** Provider cho mode và MUI theme. */
export function ThemeProvider({ children }) {
    // Ưu tiên mode đã lưu, nếu chưa có thì chọn theo giờ.
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem("refood-theme-mode");
        if (savedMode) return savedMode;
        const hour = new Date().getHours();
        return hour >= 18 || hour < 6 ? "dark" : "light";
    });

    const toggleTheme = () => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("refood-theme-mode", next);
            return next;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                {/* Áp dụng CSS nền cho toàn app. */}
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
