/**
 * HeroSection.jsx - Banner chính trang chủ
 */

import FavoriteIcon from "@mui/icons-material/Favorite";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

function HeroSection() {
    return (
        <SectionLayout
            noPadding
            sx={{
                position: "relative",
                overflow: "hidden",
                minHeight: { xs: "85vh", md: "90vh" },
                display: "flex",
                alignItems: "center",
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #FFF3E0 0%, #E8F5E9 50%, #FFF8E1 100%)"
                        : "linear-gradient(135deg, #1a1205 0%, #0a1f0d 50%, #1a1205 100%)",
            }}
        >
            {/* Decorative circles */}
            <Box
                sx={{
                    position: "absolute",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(232,101,26,0.12) 0%, transparent 70%)",
                    top: -100,
                    right: -100,
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    width: 300,
                    height: 300,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(46,125,50,0.10) 0%, transparent 70%)",
                    bottom: -80,
                    left: -80,
                }}
            />

            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={6}
                alignItems="center"
            >
                {/* Text content */}
                <AnimatedSection
                    variant="fadeRight"
                    duration={0.8}
                    sx={{
                        flex: 1,
                        textAlign: { xs: "center", md: "left" },
                    }}
                >
                    <Chip
                        icon={<FavoriteIcon sx={{ fontSize: 16 }} />}
                        label="Sứ mệnh thiện nguyện"
                        color="secondary"
                        variant="outlined"
                        sx={{ mb: 2, fontWeight: 600 }}
                    />
                    <Typography
                        variant="h1"
                        sx={{
                            mb: 2,
                            fontSize: {
                                xs: "2.2rem",
                                sm: "2.8rem",
                                md: "3.5rem",
                            },
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        ReFood
                    </Typography>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{
                            mb: 3,
                            fontWeight: 400,
                            fontSize: { xs: "1.1rem", md: "1.4rem" },
                            lineHeight: 1.6,
                        }}
                    >
                        Kết nối yêu thương — Mang bữa ăn ấm lòng
                        <br />
                        đến với những người cần nhất
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                            mb: 4,
                            maxWidth: 520,
                            mx: { xs: "auto", md: 0 },
                        }}
                    >
                        Hỗ trợ cô chú lao động ban đêm, kết nối "Quán ăn 0 đồng"
                        với các nhóm thiện nguyện, đưa bữa ăn miễn phí đến người
                        cao tuổi neo đơn.
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent={{ xs: "center", md: "flex-start" }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<StorefrontIcon />}
                            href="#quan-an-0d"
                            sx={{
                                background:
                                    "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                },
                            }}
                        >
                            Quán Ăn 0đ
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<VolunteerActivismIcon />}
                            href="#volunteer"
                            sx={{
                                background:
                                    "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                "&:hover": {
                                    background:
                                        "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                },
                            }}
                        >
                            Tham Gia Thiện Nguyện
                        </Button>
                    </Stack>
                </AnimatedSection>

                {/* Hero visual */}
                <AnimatedSection
                    variant="fadeLeft"
                    delay={0.3}
                    duration={0.8}
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 280, sm: 350, md: 420 },
                            height: { xs: 280, sm: 350, md: 420 },
                            borderRadius: "50%",
                            overflow: "hidden",
                            border: "6px solid",
                            borderColor: "primary.light",
                            boxShadow: "0 20px 60px rgba(232,101,26,0.2)",
                            position: "relative",
                        }}
                    >
                        <Box
                            component="img"
                            src="public/assets/images/food/cao-lau.jpg"
                            alt="Món ăn Việt Nam"
                            sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>
                    {/* Floating badges */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: { xs: -10, md: 10 },
                            right: { xs: 10, md: 20 },
                            bgcolor: "secondary.main",
                            color: "#fff",
                            borderRadius: 3,
                            px: 2,
                            py: 1,
                            fontWeight: 700,
                            boxShadow: 3,
                        }}
                    >
                        🍜 24/7
                    </Box>
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: { xs: 20, md: 40 },
                            left: { xs: -10, md: 0 },
                            bgcolor: "primary.main",
                            color: "#fff",
                            borderRadius: 3,
                            px: 2,
                            py: 1,
                            fontWeight: 700,
                            boxShadow: 3,
                        }}
                    >
                        ❤️ Miễn Phí
                    </Box>
                </AnimatedSection>
            </Stack>
        </SectionLayout>
    );
}

export default HeroSection;
