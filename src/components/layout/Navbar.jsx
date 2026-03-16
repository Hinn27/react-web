/**
 * Navbar chung cua app.
 * Kien thuc ap dung:
 * - NavLink + useLocation cho active state
 * - useNavigate cho dieu huong sau logout
 * - useState cho mobile drawer/dialog
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
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
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

/**
 * Navigation links configuration
 * isRoute: true nếu là React Router route, false nếu là anchor link
 */
const navLinks = [
    {
        label: "Thực Đơn",
        href: "/menu",
        icon: <RestaurantMenuIcon />,
        isRoute: true,
    },
    { label: "Quán Ăn 0đ", href: "/#quan-an-0d", icon: <StorefrontIcon /> },
    {
        label: "Thiện Nguyện",
        href: "/#volunteer",
        icon: <VolunteerActivismIcon />,
    },
];

function Navbar() {
    const { mode, toggleTheme } = useThemeMode();
    const { user, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // useNavigate hook để điều hướng programmatically
    const navigate = useNavigate();

    // useLocation hook để lấy URL hiện tại
    const location = useLocation();

    // useState cho UI state
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [logoutDialog, setLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout();
        setLogoutDialog(false);
        // Sử dụng navigate để chuyển về trang chủ sau khi logout
        navigate("/");
    };

    /**
     * Kiểm tra link có active không
     * NavLink có thể tự làm điều này với prop isActive
     */
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
                        Giao bua an dem 24/7 • Ho tro nguoi lao dong va cac quan
                        an 0 dong
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
                                    fontSize: 32,
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

                        {/* Desktop nav links - sử dụng NavLink với style active */}
                        {!isMobile && (
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: "center",
                                }}
                            >
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.label}
                                        {...(link.isRoute
                                            ? {
                                                  component: NavLink,
                                                  to: link.href,
                                              }
                                            : { href: link.href })}
                                        startIcon={link.icon}
                                        sx={{
                                            color: isLinkActive(link.href)
                                                ? "primary.main"
                                                : "text.primary",
                                            fontWeight: isLinkActive(link.href)
                                                ? 700
                                                : 500,
                                            borderBottom: isLinkActive(
                                                link.href
                                            )
                                                ? "2px solid"
                                                : "none",
                                            borderColor: "primary.main",
                                            borderRadius: 0,
                                            "&:hover": {
                                                bgcolor: "action.hover",
                                                color: "primary.main",
                                            },
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                ))}
                            </Stack>
                        )}

                        {/* Right side */}
                        <Stack direction="row" spacing={1} alignItems="center">
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
                                    }}
                                >
                                    {mode === "dark" ? (
                                        <LightModeIcon />
                                    ) : (
                                        <DarkModeIcon />
                                    )}
                                </IconButton>
                            </Tooltip>

                            {/* Cart icon - sử dụng NavLink */}
                            <Tooltip title="Giỏ hàng">
                                <IconButton
                                    component={NavLink}
                                    to="/cart"
                                    sx={{ color: "text.primary" }}
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

                            {/* Auth buttons */}
                            {!isMobile && (
                                <>
                                    {isAuthenticated ? (
                                        <>
                                            <Typography
                                                variant="body2"
                                                sx={{ mx: 1 }}
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
                                    sx={{ color: "text.primary" }}
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
                                <Typography variant="body2">
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
