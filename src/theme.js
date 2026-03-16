import { createTheme } from "@mui/material/styles";

/**
 * Theme configuration cho Material UI
 * Bảng màu:
 * - Cam ấm: thực phẩm / sự ấm áp
 * - Xanh lá: hy vọng / thiện nguyện
 */

const palette = {
    warm: {
        main: "#E8651A",
        light: "#FF8A3D",
        dark: "#B84D10",
        contrastText: "#FFFFFF",
    },
    hope: {
        main: "#2E7D32",
        light: "#4CAF50",
        dark: "#1B5E20",
        contrastText: "#FFFFFF",
    },
};

export const getDesignTokens = (mode) => ({
    palette: {
        mode,
        primary: {
            main: palette.warm.main,
            light: palette.warm.light,
            dark: palette.warm.dark,
            contrastText: palette.warm.contrastText,
        },
        secondary: {
            main: palette.hope.main,
            light: palette.hope.light,
            dark: palette.hope.dark,
            contrastText: palette.hope.contrastText,
        },
        ...(mode === "light"
            ? {
                background: {
                    default: "#FFF8F0",
                    paper: "#FFFFFF",
                },
                text: {
                    primary: "#2D2D2D",
                    secondary: "#5A5A5A",
                },
            }
            : {
                background: {
                    default: "#121212",
                    paper: "#1E1E1E",
                },
                text: {
                    primary: "#F5F5F5",
                    secondary: "#B0B0B0",
                },
            }),
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica Neue", Arial, sans-serif',
        h1: {
            fontWeight: 800,
            fontSize: "3rem",
            lineHeight: 1.2,
        },
        h2: {
            fontWeight: 700,
            fontSize: "2.25rem",
            lineHeight: 1.3,
        },
        h3: {
            fontWeight: 700,
            fontSize: "1.75rem",
            lineHeight: 1.3,
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.5rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1.25rem",
        },
        h6: {
            fontWeight: 600,
            fontSize: "1.1rem",
        },
        body1: {
            fontSize: "1rem",
            lineHeight: 1.7,
        },
        body2: {
            fontSize: "0.9rem",
            lineHeight: 1.6,
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
            fontSize: "1rem",
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "10px 24px",
                },
                containedPrimary: {
                    boxShadow: "0 4px 14px rgba(232, 101, 26, 0.3)",
                    "&:hover": {
                        boxShadow: "0 6px 20px rgba(232, 101, 26, 0.4)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 8,
                    },
                },
            },
        },
    },
});

/**
 * Hàm tạo theme dựa trên mode (light/dark)
 */
export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
