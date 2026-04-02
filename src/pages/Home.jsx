/** Trang chủ: ghép các section chính của ReFood. */

import { Box } from "@mui/material";
import CTASection from "../components/home/CTASection";
import HeroSection from "../components/home/HeroSection";
import MenuSection from "../components/home/MenuSection";
import RecommendationsSection from "../components/home/RecommendationsSection";
import StatsSection from "../components/home/StatsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import ZeroDongSection from "../components/home/ZeroDongSection";

function Home() {
    return (
        <Box>
            {/* Hero Banner — Giới thiệu sứ mệnh ReFood */}
            <HeroSection />

            {/* Khu vực Gợi ý */}
            <RecommendationsSection />

            {/* Phân mục 1: Thực đơn đầy đủ — lọc theo danh mục */}
            <MenuSection />

            {/* Thống kê con số ấn tượng — animation đếm số */}
            <StatsSection />

            {/* Quán ăn 0 đồng — hiển thị data zeroDongRestaurants */}
            <ZeroDongSection />

            {/* Câu chuyện cộng đồng — testimonials carousel */}
            <TestimonialsSection />

            {/* Kêu gọi hành động — đăng ký tình nguyện */}
            <CTASection />
        </Box>
    );
}

export default Home;
