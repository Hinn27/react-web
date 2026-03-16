/**
 * Layout.jsx - Layout Component chính
 *
 * Theo kiến thức React Router Dom:
 * - Sử dụng Outlet để đánh dấu vị trí render các component con (nested routes)
 * - Layout chứa các phần chung như Navbar, Footer
 * - Page content sẽ được render tại vị trí Outlet
 */

import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import CartSnackbar from "../common/CartSnackbar";
import MobileSpeedDial from "../common/MobileSpeedDial";
import PageTransition from "../common/PageTransition";
import Footer from "./Footer";
import Navbar from "./Navbar";

/**
 * Layout Component
 * Sử dụng Outlet cho nested routes - nơi các page components được render
 */
function Layout() {
    // useLocation hook để lấy thông tin URL hiện tại
    const location = useLocation();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            {/* Navbar cố định ở trên */}
            <Navbar />

            {/* Main content với PageTransition animation */}
            <Box component="main" sx={{ flex: 1 }}>
                <PageTransition>
                    {/*
                     * Outlet - theo kiến thức React Router Dom:
                     * Đánh dấu vị trí render nội dung của component con
                     * Các nested routes sẽ được render tại đây
                     */}
                    <Outlet />
                </PageTransition>
            </Box>

            {/* Footer cố định ở dưới */}
            <Footer />

            {/* Snackbar thông báo thêm giỏ hàng */}
            <CartSnackbar />

            {/* Speed dial cho mobile */}
            <MobileSpeedDial />
        </Box>
    );
}

export default Layout;
