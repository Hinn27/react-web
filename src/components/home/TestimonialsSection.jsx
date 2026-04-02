/**
 * TestimonialsSection.jsx — Câu chuyện từ cộng đồng.
 * Kiến thức áp dụng:
 * - `useState` cho điều hướng testimonial
 * - `useCallback` tối ưu hàm chuyển slide
 * - Conditional rendering
 */

import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

const testimonials = [
    {
        name: "Anh Nguyễn Văn Tâm",
        role: "Công nhân nhà máy, ca đêm",
        avatar: "🧑‍🔧",
        quote: "Mỗi đêm đi làm về, có tô phở nóng từ ReFood là thấy ấm lòng lắm. Giá cả phải chăng, giao nhanh, mà món ăn ngon không kém ngoài quán.",
    },
    {
        name: "Chị Trần Thị Hoa",
        role: "Tình nguyện viên",
        avatar: "👩‍🍳",
        quote: "Tham gia ReFood giúp tôi thấy mình có ích hơn. Được nấu những bữa cơm 0 đồng, nhìn nụ cười của mọi người, đó là niềm vui lớn nhất.",
    },
    {
        name: "Bác Lê Văn Hùng",
        role: "Bảo vệ khu công nghiệp",
        avatar: "👨‍✈️",
        quote: "Trước đây ca đêm hay ăn mì gói qua bữa. Từ khi biết ReFood, bữa ăn đêm đầy đủ dinh dưỡng hơn hẳn. Cảm ơn ReFood nhiều lắm!",
    },
    {
        name: "Cô Phạm Thị Mai",
        role: "Chủ quán ăn 0 đồng",
        avatar: "👩‍🦳",
        quote: "ReFood giúp kết nối quán cơm từ thiện của tôi với nhiều người hơn. Mỗi ngày phục vụ được thêm 50 suất nhờ ứng dụng này.",
    },
];

function TestimonialsSection() {
    // State cho slide hiện tại.
    const [current, setCurrent] = useState(0);

    // Chuyển slide.
    const handlePrev = useCallback(() => {
        setCurrent((prev) =>
            prev === 0 ? testimonials.length - 1 : prev - 1,
        );
    }, []);

    const handleNext = useCallback(() => {
        setCurrent((prev) =>
            prev === testimonials.length - 1 ? 0 : prev + 1,
        );
    }, []);

    const testimonial = testimonials[current];

    return (
        <SectionLayout
            bgcolor={(theme) =>
                theme.palette.mode === "light"
                    ? "#FAFAFA"
                    : "rgba(255,255,255,0.02)"
            }
        >
            <AnimatedSection variant="fadeUp">
                <Stack spacing={1} alignItems="center" sx={{ mb: 4 }}>
                    <FormatQuoteIcon
                        sx={{ fontSize: 48, color: "primary.main" }}
                    />
                    <Typography variant="h3" fontWeight={700}>
                        Câu Chuyện Cộng Đồng
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 500 }}
                    >
                        Những chia sẻ thật lòng từ người lao động, tình nguyện
                        viên và đối tác của ReFood
                    </Typography>
                </Stack>
            </AnimatedSection>

            <AnimatedSection variant="scale" delay={0.15}>
                <Card
                    sx={{
                        maxWidth: 700,
                        mx: "auto",
                        p: { xs: 2, md: 4 },
                        textAlign: "center",
                        position: "relative",
                        overflow: "visible",
                    }}
                >
                    <CardContent>
                        <Stack spacing={3} alignItems="center">
                            {/* Avatar */}
                            <Avatar
                                sx={{
                                    width: 72,
                                    height: 72,
                                    fontSize: 36,
                                    bgcolor: "rgba(232,101,26,0.1)",
                                    border: "3px solid",
                                    borderColor: "primary.light",
                                }}
                            >
                                {testimonial.avatar}
                            </Avatar>

                            {/* Quote */}
                            <Typography
                                variant="body1"
                                sx={{
                                    fontStyle: "italic",
                                    lineHeight: 1.8,
                                    color: "text.primary",
                                    maxWidth: 550,
                                    fontSize: { xs: "0.95rem", md: "1.1rem" },
                                }}
                            >
                                &ldquo;{testimonial.quote}&rdquo;
                            </Typography>

                            {/* Name & Role */}
                            <Box>
                                <Typography variant="subtitle1" fontWeight={700}>
                                    {testimonial.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {testimonial.role}
                                </Typography>
                            </Box>

                            {/* Navigation */}
                            <Stack
                                direction="row"
                                spacing={2}
                                alignItems="center"
                            >
                                <IconButton
                                    onClick={handlePrev}
                                    sx={{
                                        bgcolor: "action.hover",
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    <NavigateBeforeIcon />
                                </IconButton>

                                {/* Dots */}
                                <Stack direction="row" spacing={0.8}>
                                    {testimonials.map((_, idx) => (
                                        <Box
                                            key={idx}
                                            onClick={() => setCurrent(idx)}
                                            sx={{
                                                width: current === idx ? 24 : 8,
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor:
                                                    current === idx
                                                        ? "primary.main"
                                                        : "action.disabled",
                                                cursor: "pointer",
                                                transition: "all 0.3s",
                                            }}
                                        />
                                    ))}
                                </Stack>

                                <IconButton
                                    onClick={handleNext}
                                    sx={{
                                        bgcolor: "action.hover",
                                        "&:hover": {
                                            bgcolor: "primary.light",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    <NavigateNextIcon />
                                </IconButton>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default TestimonialsSection;
