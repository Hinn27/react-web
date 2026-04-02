/**
 * CTASection.jsx — Kêu gọi hành động.
 * Kiến thức áp dụng:
 * - React Router `Link` để điều hướng
 * - Grid layout responsive
 */

import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

const ctaCards = [
    {
        icon: <VolunteerActivismIcon sx={{ fontSize: 48 }} />,
        title: "Tình nguyện viên",
        desc: "Tham gia cùng ReFood để nấu cơm, giao hàng và giúp đỡ cộng đồng người lao động ban đêm.",
        color: "#2E7D32",
        bgColor: "rgba(46,125,50,0.08)",
    },
    {
        icon: <StorefrontIcon sx={{ fontSize: 48 }} />,
        title: "Đăng ký quán 0 đồng",
        desc: "Bạn đang vận hành quán ăn từ thiện? Kết nối với ReFood để tiếp cận nhiều người cần hơn.",
        color: "#E8651A",
        bgColor: "rgba(232,101,26,0.08)",
    },
    {
        icon: <FavoriteIcon sx={{ fontSize: 48 }} />,
        title: "Ủng hộ / Tài trợ",
        desc: "Mỗi đóng góp nhỏ đều tạo nên bữa cơm ấm lòng. Cùng chung tay vì cộng đồng.",
        color: "#C62828",
        bgColor: "rgba(198,40,40,0.08)",
    },
];

function CTASection() {
    return (
        <SectionLayout
            sx={{
                py: { xs: 6, md: 8 },
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #E8F5E9 0%, #FFF3E0 50%, #E8F5E9 100%)"
                        : "linear-gradient(135deg, #0a1f0d 0%, #1a1205 50%, #0a1f0d 100%)",
            }}
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        textAlign="center"
                    >
                        Cùng ReFood Lan Tỏa Yêu Thương
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 550 }}
                    >
                        Dù bạn là ai, bạn đều có thể đóng góp cho cộng đồng.
                        Hãy chọn cách phù hợp nhất với bạn!
                    </Typography>
                </Stack>
            </AnimatedSection>

            <Grid container spacing={3}>
                {ctaCards.map((card, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <AnimatedSection variant="fadeUp" delay={index * 0.12}>
                            <Card
                                sx={{
                                    height: "100%",
                                    textAlign: "center",
                                    transition: "all 0.3s",
                                    border: "2px solid transparent",
                                    "&:hover": {
                                        transform: "translateY(-6px)",
                                        borderColor: card.color,
                                        boxShadow: `0 12px 40px ${card.bgColor}`,
                                    },
                                }}
                            >
                                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                                    <Stack spacing={2.5} alignItems="center">
                                        <Box
                                            sx={{
                                                color: card.color,
                                                bgcolor: card.bgColor,
                                                borderRadius: "50%",
                                                width: 80,
                                                height: 80,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {card.icon}
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ lineHeight: 1.7 }}
                                        >
                                            {card.desc}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </Grid>
                ))}
            </Grid>

            {/* CTA Button */}
            <AnimatedSection variant="fadeUp" delay={0.4}>
                <Stack alignItems="center" sx={{ mt: 5 }}>
                    <Button
                        component={RouterLink}
                        to="/register"
                        variant="contained"
                        size="large"
                        startIcon={<PersonAddIcon />}
                        sx={{
                            px: 5,
                            py: 1.8,
                            fontSize: "1.1rem",
                            background:
                                "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                            },
                        }}
                    >
                        Đăng Ký Tham Gia Ngay
                    </Button>
                </Stack>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default CTASection;
