/**
 * Layout dùng chung cho mọi trang.
 * Trang con sẽ render ở vị trí `Outlet`.
 */

import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CartSnackbar from "../common/CartSnackbar";
import MobileSpeedDial from "../common/MobileSpeedDial";
import PageTransition from "../common/PageTransition";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Layout() {
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
                    {/* Nội dung trang con render tại đây. */}
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
