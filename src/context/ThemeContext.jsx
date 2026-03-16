/**
 * Theme context (light/dark).
 * Kien thuc ap dung:
 * - useState de luu mode
 * - useContext de chia se mode/toggle
 * - useMemo de tao MUI theme toi uu
 */

import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { createAppTheme } from "../theme";

const ThemeContext = createContext({
    mode: "light",
    toggleTheme: () => {},
});

/** Hook truy cap theme context. */
export const useThemeMode = () => useContext(ThemeContext);

/** Provider cho theme mode + MUI theme. */
export function ThemeProvider({ children }) {
    // Uu tien mode da luu, neu khong co thi mac dinh theo gio.
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
                {/* Apply baseline CSS cho toan app. */}
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
