/** Trang chủ: ghép các section chính của ReFood. */

import { Box } from "@mui/material";
import HeroSection from "../components/home/HeroSection";
import MenuSection from "../components/home/MenuSection";

function Home() {
    return (
        <Box>
            {/* Hero Banner — Giới thiệu sứ mệnh ReFood */}
            <HeroSection />

            {/* Phân mục 1: Thực đơn đầy đủ — lọc theo danh mục */}
            <MenuSection />
        </Box>
    );
}

export default Home;
