/**
 * ClockSection.jsx — Hiển thị đồng hồ thời gian thực.
 * Kiến thức áp dụng:
 * - Custom Hook `useClock` (useState + useEffect + cleanup)
 * - Conditional rendering theo trạng thái ban đêm / ban ngày
 */

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import useClock from "../../hooks/useClock";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

function ClockSection() {
    // Custom hook: cập nhật thời gian mỗi giây.
    const { formattedTime, formattedDate, isNightTime, hours } = useClock();

    // Nội dung thay đổi theo ban đêm / ban ngày.
    const greeting = isNightTime
        ? "Đang là ca đêm — ReFood luôn sẵn sàng phục vụ bạn!"
        : "Chúc bạn một ngày tốt lành — Cùng ReFood lan tỏa yêu thương!";

    const icon = isNightTime ? (
        <DarkModeIcon sx={{ fontSize: 28, color: "#FFD54F" }} />
    ) : (
        <LightModeIcon sx={{ fontSize: 28, color: "#FF8A3D" }} />
    );

    return (
        <SectionLayout
            sx={{
                py: { xs: 4, md: 5 },
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? isNightTime
                            ? "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1a237e 100%)"
                            : "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)"
                        : isNightTime
                          ? "linear-gradient(135deg, #0d0d2b 0%, #1a1a3e 100%)"
                          : "linear-gradient(135deg, #1a1205 0%, #1f1a0a 100%)",
            }}
        >
            <AnimatedSection variant="fadeUp">
                <Paper
                    elevation={isNightTime ? 8 : 2}
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 4,
                        textAlign: "center",
                        background: (theme) =>
                            theme.palette.mode === "light"
                                ? isNightTime
                                    ? "rgba(255,255,255,0.12)"
                                    : "rgba(255,255,255,0.85)"
                                : "rgba(30,30,30,0.7)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid",
                        borderColor: isNightTime
                            ? "rgba(255,213,79,0.3)"
                            : "rgba(232,101,26,0.15)",
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        {/* Trạng thái ngày / đêm */}
                        <Chip
                            icon={icon}
                            label={
                                isNightTime ? "🌙 Ban đêm" : "☀️ Ban ngày"
                            }
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.95rem",
                                py: 2.5,
                                px: 1,
                                bgcolor: isNightTime
                                    ? "rgba(255,213,79,0.15)"
                                    : "rgba(255,138,61,0.12)",
                                color: isNightTime
                                    ? "#FFD54F"
                                    : "primary.main",
                            }}
                        />

                        {/* Giờ lớn */}
                        <Typography
                            variant="h2"
                            fontWeight={800}
                            sx={{
                                fontFamily: '"Roboto Mono", monospace',
                                fontSize: { xs: "2.5rem", md: "3.5rem" },
                                color: isNightTime
                                    ? "#FFD54F"
                                    : "primary.main",
                                textShadow: isNightTime
                                    ? "0 0 20px rgba(255,213,79,0.3)"
                                    : "none",
                                letterSpacing: 4,
                            }}
                        >
                            {formattedTime}
                        </Typography>

                        {/* Ngày */}
                        <Typography
                            variant="body1"
                            sx={{
                                color: isNightTime
                                    ? "rgba(255,255,255,0.7)"
                                    : "text.secondary",
                            }}
                        >
                            {formattedDate}
                        </Typography>

                        {/* Lời nhắn */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mt: 1,
                            }}
                        >
                            <LocalDiningIcon
                                sx={{
                                    color: isNightTime
                                        ? "#FFD54F"
                                        : "secondary.main",
                                    fontSize: 20,
                                }}
                            />
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                    color: isNightTime
                                        ? "rgba(255,255,255,0.85)"
                                        : "text.primary",
                                }}
                            >
                                {greeting}
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default ClockSection;
