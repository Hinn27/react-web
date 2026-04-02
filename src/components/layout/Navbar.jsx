/**
 * Thanh điều hướng chung của app.
 * Kiến thức áp dụng: `NavLink`, `useLocation`, `useNavigate`, `useState`.
 */

import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
    AppBar,
    Badge,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useThemeMode } from "../../context/ThemeContext";
import { LAYOUT_MAX_WIDTH, RESPONSIVE_PX } from "./SectionLayout";

const navLinks = [
    {
        label: "Thực Đơn",
        href: "/menu",
        icon: <RestaurantMenuIcon />,
        isRoute: true,
    },
    {
        label: "Quản Trị",
        href: "/admin",
        icon: <RestaurantIcon />, // Placeholder icon
        isRoute: true,
        adminOnly: true,
    },
];

function Navbar() {
    const { mode, toggleTheme } = useThemeMode();
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // Điều hướng sau logout.
    const navigate = useNavigate();

    // Lấy URL hiện tại để highlight menu.
    const location = useLocation();

    // State cho drawer/dialog trên UI.
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout();
        setLogoutDialog(false);
        // Logout xong quay về trang chủ.
        navigate("/");
    };

    /** Kiểm tra link menu đang active. */
    const isLinkActive = (path) => {
        if (path.startsWith("/#")) return false;
        return location.pathname === path;
    };

    return (
        <>
            <AppBar
                position="sticky"
                sx={{
                    bgcolor: "background.paper",
                    color: "text.primary",
                    backdropFilter: "blur(10px)",
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? "rgba(255,255,255,0.9)"
                            : "rgba(30,30,30,0.9)",
                }}
            >
                <Box
                    sx={{
                        px: RESPONSIVE_PX,
                        py: 0.75,
                        textAlign: "center",
                        background:
                            "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                        color: "#fff",
                    }}
                >
                    <Typography variant="body2" fontWeight={700}>
                        Trọn vị cuối ngày • Đong đầy ý nghĩa
                    </Typography>
                </Box>
                <Box
                    sx={{
                        maxWidth: LAYOUT_MAX_WIDTH.default,
                        mx: "auto",
                        px: RESPONSIVE_PX,
                        width: "100%",
                    }}
                >
                    <Toolbar disableGutters sx={{ py: 0.5 }}>
                        {/* Logo - sử dụng NavLink */}
                        <Stack
                            component={NavLink}
                            to="/"
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                                flexGrow: { xs: 1, md: 0 },
                                mr: { md: 4 },
                                textDecoration: "none",
                                cursor: "pointer",
                            }}
                        >
                            <RestaurantIcon
                                sx={{
                                    fontSize: 35,
                                    color: "primary.main",
                                }}
                            />
                            <Typography
                                variant="h5"
                                fontWeight={800}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ReFood
                            </Typography>
                        </Stack>

                        {/* Right side */}
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ ml: "auto" }}
                        >
                            {/* Desktop order: Thực Đơn -> Giỏ Hàng -> Theme Mode -> Đăng Nhập */}
                            {!isMobile && (
                                <Tooltip title="Thực đơn">
                                    <IconButton
                                        component={NavLink}
                                        to="/menu"
                                        sx={{
                                            color: isLinkActive("/menu")
                                                ? "primary.main"
                                                : "text.primary",
                                            "& .MuiSvgIcon-root": {
                                                fontSize: 27,
                                            },
                                            "&:hover": {
                                                bgcolor: "action.hover",
                                                color: "primary.main",
                                            },
                                        }}
                                    >
                                        <RestaurantMenuIcon />
                                    </IconButton>
                                </Tooltip>
                            )}

                            {/* Giỏ hàng */}
                            <Tooltip title="Giỏ hàng">
                                <IconButton
                                    component={NavLink}
                                    to="/cart"
                                    sx={{
                                        color: "text.primary",
                                        "& .MuiSvgIcon-root": {
                                            fontSize: 27,
                                        },
                                    }}
                                >
                                    <Badge
                                        badgeContent={totalItems}
                                        color="primary"
                                        max={99}
                                    >
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {/* Theme mode */}
                            <Tooltip
                                title={
                                    mode === "dark"
                                        ? "Chế độ sáng"
                                        : "Chế độ tối (Ban đêm)"
                                }
                            >
                                <IconButton
                                    onClick={toggleTheme}
                                    sx={{
                                        color:
                                            mode === "dark"
                                                ? "#FFD54F"
                                                : "#5C6BC0",
                                        "& .MuiSvgIcon-root": {
                                            fontSize: 27,
                                        },
                                    }}
                                >
                                    {mode === "dark" ? (
                                        <LightModeIcon />
                                    ) : (
                                        <DarkModeIcon />
                                    )}
                                </IconButton>
                            </Tooltip>

                            {/* Auth buttons */}
                            {!isMobile && (
                                <>
                                    {isAuthenticated ? (
                                        <>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    mx: 1,
                                                    fontSize: "1rem",
                                                }}
                                            >
                                                Xin chào,{" "}
                                                <strong>{user?.name}</strong>
                                            </Typography>
                                            <Tooltip title="Đăng xuất">
                                                <IconButton
                                                    color="error"
                                                    onClick={() =>
                                                        setLogoutDialog(true)
                                                    }
                                                    sx={{
                                                        "& .MuiSvgIcon-root": {
                                                            fontSize: 27,
                                                        },
                                                    }}
                                                >
                                                    <LogoutIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <Button
                                            component={NavLink}
                                            to="/login"
                                            variant="contained"
                                            startIcon={<LoginIcon />}
                                            sx={{
                                                background:
                                                    "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                                "& .MuiSvgIcon-root": {
                                                    fontSize: 23,
                                                },
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                                },
                                            }}
                                        >
                                            Đăng Nhập
                                        </Button>
                                    )}
                                </>
                            )}

                            {/* Mobile menu button */}
                            {isMobile && (
                                <IconButton
                                    onClick={() => setDrawerOpen(true)}
                                    sx={{
                                        color: "text.primary",
                                        "& .MuiSvgIcon-root": {
                                            fontSize: 27,
                                        },
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </Toolbar>
                </Box>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box
                    sx={{
                        width: 280,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ p: 2 }}
                    >
                        <Typography variant="h6" fontWeight={700}>
                            Menu
                        </Typography>
                        <IconButton onClick={() => setDrawerOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Divider />
                    <List sx={{ flex: 1 }}>
                        {navLinks.map((link) => (
                            <ListItem key={link.label} disablePadding>
                                <ListItemButton
                                    {...(link.isRoute
                                        ? {
                                              component: NavLink,
                                              to: link.href,
                                          }
                                        : { href: link.href })}
                                    onClick={() => setDrawerOpen(false)}
                                    selected={isLinkActive(link.href)}
                                >
                                    <ListItemIcon>{link.icon}</ListItemIcon>
                                    <ListItemText primary={link.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        {isAuthenticated ? (
                            <Stack spacing={2}>
                                <Typography
                                    variant="body1"
                                    sx={{ fontSize: "1rem" }}
                                >
                                    Xin chào, <strong>{user?.name}</strong>
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="error"
                                    startIcon={<LogoutIcon />}
                                    onClick={() => {
                                        setDrawerOpen(false);
                                        setLogoutDialog(true);
                                    }}
                                >
                                    Đăng xuất
                                </Button>
                            </Stack>
                        ) : (
                            <Button
                                fullWidth
                                component={NavLink}
                                to="/login"
                                variant="contained"
                                startIcon={<LoginIcon />}
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                }}
                            >
                                Đăng Nhập
                            </Button>
                        )}
                    </Box>
                </Box>
            </Drawer>

            {/* Logout confirmation dialog */}
            <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
                <DialogTitle>Xác nhận đăng xuất</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialog(false)}>Hủy</Button>
                    <Button
                        onClick={handleLogout}
                        color="error"
                        variant="contained"
                    >
                        Đăng xuất
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Navbar;
