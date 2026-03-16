/**
 * NotFound.jsx - Trang 404
 *
 * Theo kiến thức React Router Dom:
 * - Route với path="*" sẽ match với bất kỳ URL nào không match các route khác
 * - useNavigate: Điều hướng về trang chủ hoặc trang trước
 * - Link: Tạo liên kết đến các trang chính
 */

import HomeIcon from "@mui/icons-material/Home";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";

function NotFound() {
    const navigate = useNavigate();

    return (
        <SectionLayout
            variant="narrow"
            sx={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                py: 8,
            }}
        >
            <AnimatedSection variant="scale">
                <SentimentDissatisfiedIcon
                    sx={{
                        fontSize: 120,
                        color: "warning.main",
                        mb: 2,
                    }}
                />
                <Typography
                    variant="h1"
                    fontWeight={800}
                    sx={{
                        fontSize: { xs: 80, md: 120 },
                        background:
                            "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                    }}
                >
                    404
                </Typography>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    Oops! Trang không tồn tại
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 480, mx: "auto" }}
                >
                    Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm
                    thời không khả dụng.
                </Typography>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/"
                        startIcon={<HomeIcon />}
                        sx={{
                            px: 4,
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                        }}
                    >
                        Về trang chủ
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        component={RouterLink}
                        to="/menu"
                        startIcon={<RestaurantMenuIcon />}
                        sx={{ px: 4 }}
                    >
                        Xem thực đơn
                    </Button>
                </Stack>

                <Box sx={{ mt: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                        Hoặc{" "}
                        <Typography
                            component="span"
                            variant="body2"
                            color="primary"
                            sx={{
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                            onClick={() => navigate(-1)}
                        >
                            quay lại trang trước
                        </Typography>
                    </Typography>
                </Box>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default NotFound;
