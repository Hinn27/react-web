/**
 * Section Quan An 0d.
 * Kien thuc ap dung:
 * - useRef + useInView cho animation trigger
 * - useCallback cho add-to-cart handler
 * - Link qua React Router
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PeopleIcon from "@mui/icons-material/People";
import PhoneIcon from "@mui/icons-material/Phone";
import StorefrontIcon from "@mui/icons-material/Storefront";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useInView } from "framer-motion";
import { useCallback, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { allMeals, zeroDongRestaurants } from "../../data/meals";
import AnimatedSection, {
    MotionBox,
    staggerContainer,
    staggerItem,
} from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

function QuanAn0dSection() {
    const { addItem } = useCart();
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

    const handleAddToCart = useCallback(
        (meal) => {
            addItem({
                _id: meal._id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
            });
        },
        [addItem]
    );

    // Lấy 6 món đầu cho section này
    const displayMeals = allMeals.slice(0, 6);

    return (
        <SectionLayout id="quan-an-0d" bgcolor="background.default">
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center", sm: "flex-end" }}
                    sx={{ mb: 5 }}
                    spacing={2}
                >
                    <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                                mb: 1,
                                justifyContent: {
                                    xs: "center",
                                    sm: "flex-start",
                                },
                            }}
                        >
                            <StorefrontIcon color="primary" fontSize="large" />
                            <Typography variant="h3" fontWeight={700}>
                                Quán Ăn 0đ
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: 480 }}
                        >
                            Bữa ăn miễn phí cho người lao động khó khăn — Đặt
                            nhanh, giao tận nơi, hoàn toàn miễn phí
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={RouterLink}
                        to="/menu"
                    >
                        Xem tất cả →
                    </Button>
                </Stack>
            </AnimatedSection>

            {/* Meal Cards */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
                <MotionBox
                    ref={gridRef}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isGridInView ? "visible" : "hidden"}
                >
                    <Grid container spacing={3} sx={{ mb: 6 }}>
                        {displayMeals.map((meal) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4 }}
                                key={meal._id}
                            >
                                <MotionBox variants={staggerItem}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            position: "relative",
                                        }}
                                    >
                                        <Chip
                                            label={meal.tag}
                                            size="small"
                                            icon={<LocalFireDepartmentIcon />}
                                            sx={{
                                                position: "absolute",
                                                top: 12,
                                                left: 12,
                                                zIndex: 2,
                                                bgcolor: "primary.main",
                                                color: "#fff",
                                                fontWeight: 600,
                                                "& .MuiChip-icon": {
                                                    color: "#fff",
                                                },
                                            }}
                                        />
                                        <CardActionArea
                                            component={RouterLink}
                                            to={`/product/${meal._id}`}
                                        >
                                            <CardMediaSkeleton
                                                component="img"
                                                image={meal.image}
                                                alt={meal.name}
                                                sx={{
                                                    aspectRatio: "16/10",
                                                    objectFit: "cover",
                                                    width: "100%",
                                                }}
                                            />
                                        </CardActionArea>
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={700}
                                                gutterBottom
                                            >
                                                {meal.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mb: 1.5 }}
                                            >
                                                {meal.desc}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Stack
                                                    direction="row"
                                                    spacing={0.5}
                                                    alignItems="center"
                                                >
                                                    <AccessTimeIcon
                                                        sx={{
                                                            fontSize: 16,
                                                            color: "text.secondary",
                                                        }}
                                                    />
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                    >
                                                        {meal.time}
                                                    </Typography>
                                                </Stack>
                                                <Tooltip title="Thêm vào giỏ">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() =>
                                                            handleAddToCart(
                                                                meal
                                                            )
                                                        }
                                                        sx={{
                                                            bgcolor:
                                                                "primary.light",
                                                            color: "#fff",
                                                            "&:hover": {
                                                                bgcolor:
                                                                    "primary.main",
                                                            },
                                                        }}
                                                    >
                                                        <AddShoppingCartIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>
                </MotionBox>
            </AnimatedSection>

            {/* Restaurant List */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 3 }}>
                    📍 Danh Sách Quán Ăn 0đ
                </Typography>
                <Grid container spacing={3}>
                    {zeroDongRestaurants.map((restaurant) => (
                        <Grid
                            size={{ xs: 12, sm: 6, md: 3 }}
                            key={restaurant.id}
                        >
                            <Card sx={{ height: "100%" }}>
                                <CardContent>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        alignItems="center"
                                        sx={{ mb: 2 }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 56,
                                                height: 56,
                                                fontSize: 28,
                                                bgcolor: "primary.light",
                                            }}
                                        >
                                            {restaurant.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight={700}
                                            >
                                                {restaurant.name}
                                            </Typography>
                                            <Chip
                                                label={restaurant.status}
                                                size="small"
                                                color={
                                                    restaurant.status ===
                                                    "Đang mở"
                                                        ? "success"
                                                        : "default"
                                                }
                                                sx={{ fontWeight: 600 }}
                                            />
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ my: 1.5 }} />
                                    <Stack spacing={1}>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="flex-start"
                                        >
                                            <LocationOnIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "primary.main",
                                                    mt: 0.2,
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {restaurant.address}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "secondary.main",
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {restaurant.hours}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <PeopleIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "info.main",
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {restaurant.served}
                                            </Typography>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                        >
                                            <PhoneIcon
                                                sx={{
                                                    fontSize: 18,
                                                    color: "success.main",
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                            >
                                                {restaurant.phone}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default QuanAn0dSection;
