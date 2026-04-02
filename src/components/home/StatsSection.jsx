/**
 * StatsSection.jsx — Hiển thị các con số ấn tượng.
 * Kiến thức áp dụng:
 * - `useState` + `useEffect` cho animation đếm số
 * - `useRef` + `useInView` (framer-motion) để trigger animation khi vào viewport
 * - `useCallback` tối ưu hàm đếm
 */

import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

// Dữ liệu thống kê.
const statsData = [
    {
        icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
        value: 15000,
        suffix: "+",
        label: "Suất ăn đã phục vụ",
        color: "#E8651A",
    },
    {
        icon: <StorefrontIcon sx={{ fontSize: 40 }} />,
        value: 12,
        suffix: "",
        label: "Quán ăn 0 đồng",
        color: "#2E7D32",
    },
    {
        icon: <GroupsIcon sx={{ fontSize: 40 }} />,
        value: 200,
        suffix: "+",
        label: "Tình nguyện viên",
        color: "#1565C0",
    },
    {
        icon: <FavoriteIcon sx={{ fontSize: 40 }} />,
        value: 5000,
        suffix: "+",
        label: "Lượt ủng hộ",
        color: "#C62828",
    },
];

/** Component đếm số có animation. */
function AnimatedCounter({ target, suffix, inView }) {
    const [count, setCount] = useState(0);

    // Animation đếm số từ 0 → target khi vào viewport.
    const animate = useCallback(() => {
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            setCount(current);

            if (step >= steps) {
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [target]);

    useEffect(() => {
        if (inView) {
            const cleanup = animate();
            return cleanup;
        }
    }, [inView, animate]);

    return (
        <span>
            {count.toLocaleString("vi-VN")}
            {suffix}
        </span>
    );
}

function StatsSection() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <SectionLayout
            sx={{
                py: { xs: 6, md: 8 },
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)"
                        : "linear-gradient(135deg, #5A2D0C 0%, #1B5E20 100%)",
            }}
        >
            <AnimatedSection variant="fadeUp">
                <Typography
                    variant="h3"
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 1, color: "#fff" }}
                >
                    Con Số Ấn Tượng
                </Typography>
                <Typography
                    variant="body1"
                    textAlign="center"
                    sx={{ mb: 5, color: "rgba(255,255,255,0.8)" }}
                >
                    Hành trình kết nối yêu thương của ReFood qua từng con số
                </Typography>
            </AnimatedSection>

            <Box ref={sectionRef}>
                <Grid container spacing={3}>
                    {statsData.map((stat, index) => (
                        <Grid size={{ xs: 6, md: 3 }} key={index}>
                            <AnimatedSection
                                variant="fadeUp"
                                delay={index * 0.1}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: { xs: 2.5, md: 4 },
                                        textAlign: "center",
                                        borderRadius: 4,
                                        bgcolor: "rgba(255,255,255,0.12)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            bgcolor: "rgba(255,255,255,0.18)",
                                        },
                                    }}
                                >
                                    <Stack spacing={1.5} alignItems="center">
                                        <Box
                                            sx={{
                                                color: stat.color,
                                                bgcolor: "rgba(255,255,255,0.9)",
                                                borderRadius: "50%",
                                                width: 64,
                                                height: 64,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            {stat.icon}
                                        </Box>
                                        <Typography
                                            variant="h3"
                                            fontWeight={800}
                                            sx={{
                                                color: "#fff",
                                                fontSize: {
                                                    xs: "1.8rem",
                                                    md: "2.5rem",
                                                },
                                            }}
                                        >
                                            <AnimatedCounter
                                                target={stat.value}
                                                suffix={stat.suffix}
                                                inView={isInView}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: "rgba(255,255,255,0.85)",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {stat.label}
                                        </Typography>
                                    </Stack>
                                </Paper>
                            </AnimatedSection>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SectionLayout>
    );
}

export default StatsSection;
