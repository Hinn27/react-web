/**
 * ZeroDongSection.jsx — Danh sách quán ăn 0 đồng.
 * Kiến thức áp dụng:
 * - `useState` để toggle hiển thị chi tiết
 * - `Array.map()` render danh sách
 * - Conditional rendering (trạng thái quán)
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { zeroDongRestaurants } from "../../data/meals";
import AnimatedSection, {
    MotionBox,
    staggerContainer,
    staggerItem,
} from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

function ZeroDongSection() {
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

    return (
        <SectionLayout
            id="zero-dong"
            bgcolor={(theme) =>
                theme.palette.mode === "light"
                    ? "rgba(46,125,50,0.04)"
                    : "rgba(46,125,50,0.08)"
            }
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ mb: 1 }}
                >
                    <VolunteerActivismIcon
                        sx={{ fontSize: 36, color: "secondary.main" }}
                    />
                    <Typography variant="h3" fontWeight={700}>
                        Quán Ăn 0 Đồng
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, maxWidth: 600 }}
                >
                    Kết nối với các quán ăn từ thiện — Mang bữa cơm miễn phí đến
                    những hoàn cảnh khó khăn trong cộng đồng
                </Typography>
            </AnimatedSection>

            {/* Restaurant Cards */}
            <MotionBox
                ref={gridRef}
                variants={staggerContainer}
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
            >
                <Grid container spacing={3}>
                    {zeroDongRestaurants.map((restaurant) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={restaurant.id}
                        >
                            <MotionBox variants={staggerItem}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        minHeight: 420,
                                        position: "relative",
                                        overflow: "visible",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "transform 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                        },
                                    }}
                                >
                                    {/* Trạng thái */}
                                    <Chip
                                        label={restaurant.status}
                                        size="small"
                                        sx={{
                                            position: "absolute",
                                            top: -10,
                                            right: 16,
                                            fontWeight: 700,
                                            bgcolor:
                                                restaurant.status === "Đang mở"
                                                    ? "secondary.main"
                                                    : "grey.500",
                                            color: "#fff",
                                        }}
                                    />
                                    <CardContent
                                        sx={{
                                            pt: 3,
                                            display: "flex",
                                            flexDirection: "column",
                                            flexGrow: 1,
                                        }}
                                    >
                                        <Stack
                                            spacing={2}
                                            alignItems="center"
                                            textAlign="center"
                                            sx={{ height: "100%" }}
                                        >
                                            {/* Avatar */}
                                            <Avatar
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    fontSize: 28,
                                                    bgcolor:
                                                        "rgba(46,125,50,0.1)",
                                                }}
                                            >
                                                {restaurant.avatar}
                                            </Avatar>

                                            {/* Tên quán */}
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={700}
                                                sx={{
                                                    minHeight: 56,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {restaurant.name}
                                            </Typography>

                                            {/* Thông tin chi tiết */}
                                            <Stack
                                                spacing={1}
                                                sx={{
                                                    width: "100%",
                                                    textAlign: "left",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                        alignItems:
                                                            "flex-start",
                                                    }}
                                                >
                                                    <LocationOnIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: "secondary.main",
                                                            mt: 0.3,
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {restaurant.address}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <AccessTimeIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: "primary.main",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                        sx={{
                                                            display:
                                                                "-webkit-box",
                                                            WebkitLineClamp: 1,
                                                            WebkitBoxOrient:
                                                                "vertical",
                                                            overflow: "hidden",
                                                        }}
                                                    >
                                                        {restaurant.hours}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <PhoneIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: "primary.main",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {restaurant.phone}
                                                    </Typography>
                                                </Box>
                                            </Stack>

                                            {/* Số suất phục vụ */}
                                            <Chip
                                                label={`🍚 ${restaurant.served}`}
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    mt: "auto",
                                                    fontWeight: 600,
                                                    borderColor:
                                                        "secondary.light",
                                                    color: "secondary.main",
                                                }}
                                            />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </MotionBox>
                        </Grid>
                    ))}
                </Grid>
            </MotionBox>
        </SectionLayout>
    );
}

export default ZeroDongSection;
