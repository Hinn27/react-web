/**
 * Section menu ở trang chủ.
 * Kiến thức áp dụng: `useState`, `useMemo`, `useRef`, `useCallback`.
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import { useInView } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { apiService } from "../../services/api";
import { formatPrice } from "../../utils/formatters";
import AnimatedSection, {
    MotionBox,
    staggerContainer,
    staggerItem,
} from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

// Danh mục để lọc nhanh.
const categoryOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Bún / Phở", value: "Bún/Phở" },
    { label: "Cơm", value: "Cơm" },
    { label: "Bánh mì", value: "Bánh mì" },
    { label: "Đồ ăn khác", value: "Cơm/Đồ ăn" },
];

function MenuSection() {
    const { addItem } = useCart();

    // Danh mục đang chọn.
    const [activeCategory, setActiveCategory] = useState("all");

    // Meals data from API
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Theo dõi vùng grid để chạy animation khi vào viewport.
    const gridRef = useRef(null);
    const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

    // Fetch meals from API
    useEffect(() => {
        const loadMeals = async () => {
            try {
                setLoading(true);
                const mealsData = await apiService.getMeals();
                setMeals(mealsData);
            } catch (err) {
                console.error("Failed to load meals:", err);
                setError("Không thể tải danh sách món ăn");
            } finally {
                setLoading(false);
            }
        };
        loadMeals();
    }, []);

    // Lọc món theo danh mục.
    const filteredMeals = useMemo(() => {
        return activeCategory === "all"
            ? meals
            : meals.filter((m) => m.category === activeCategory);
    }, [activeCategory, meals]);

    const previewMeals = useMemo(
        () => filteredMeals.slice(0, 10),
        [filteredMeals]
    );

    // Thêm món vào giỏ.
    const handleAddToCart = useCallback(
        async (meal) => {
            addItem({
                _id: meal.id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
            });
            // Log add to cart interaction
            try {
                await apiService.logInteraction(meal.id, "add_to_cart");
            } catch (error) {
                console.error("Failed to log interaction:", error);
            }
        },
        [addItem]
    );

    return (
        <SectionLayout
            id="menu"
            variant="wide"
            bgcolor={(theme) =>
                theme.palette.mode === "light"
                    ? "rgba(232,101,26,0.03)"
                    : "rgba(232,101,26,0.06)"
            }
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "center", sm: "flex-end" }}
                    sx={{ mb: 4 }}
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
                            <RestaurantMenuIcon
                                color="primary"
                                fontSize="large"
                            />
                            <Typography variant="h3" fontWeight={700}>
                                Thực Đơn Đầy Đủ
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ maxWidth: 520 }}
                        >
                            Khám phá các món ăn Việt Nam truyền thống — Phục vụ
                            24/7, giao tận nơi cho cô chú lao động
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={RouterLink}
                        to="/menu"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                            },
                        }}
                    >
                        Xem tất cả thực đơn
                    </Button>
                </Stack>
            </AnimatedSection>

            {/* Category Filter */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
                <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
                    <ToggleButtonGroup
                        value={activeCategory}
                        exclusive
                        onChange={(e, val) => val && setActiveCategory(val)}
                        size="small"
                        sx={{
                            flexWrap: "wrap",
                            gap: 1,
                            justifyContent: "center",
                            "& .MuiToggleButton-root": {
                                borderRadius: "24px !important",
                                border: "1px solid",
                                borderColor: "divider",
                                px: 2.5,
                                py: 0.8,
                                textTransform: "none",
                                fontWeight: 600,
                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    borderColor: "primary.main",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                },
                            },
                        }}
                    >
                        {categoryOptions.map((cat) => (
                            <ToggleButton key={cat.value} value={cat.value}>
                                {cat.label}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Box>
            </AnimatedSection>

            {/* Meal Grid with stagger animation */}
            <MotionBox
                ref={gridRef}
                variants={staggerContainer}
                initial="hidden"
                animate={isGridInView ? "visible" : "hidden"}
            >
                {loading ? (
                    <Grid container spacing={3}>
                        {[...Array(6)].map((_, index) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={index}
                            >
                                <CardMediaSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : error ? (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {previewMeals.map((meal) => (
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                    lg: 2.4,
                                    xl: 2.4,
                                }}
                                key={meal.id}
                            >
                                <MotionBox variants={staggerItem}>
                                    <Card
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            position: "relative",
                                            overflow: "visible",
                                            borderRadius: 3,
                                        }}
                                    >
                                        {/* Tag */}
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
                                            to={`/product/${meal.id}`}
                                            onClick={() => {
                                                // Log view interaction
                                                apiService
                                                    .logInteraction(
                                                        meal.id,
                                                        "view"
                                                    )
                                                    .catch(console.error);
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    borderRadius: 3,
                                                    overflow: "hidden",
                                                }}
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
                                            </Box>
                                        </CardActionArea>
                                        <CardContent
                                            sx={{ flexGrow: 1, pb: 1.5 }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                component="h3"
                                                fontWeight={600}
                                                sx={{
                                                    mb: 0.5,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 1,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {meal.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 1.5,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {meal.description}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                alignItems="center"
                                                sx={{ mb: 1 }}
                                            >
                                                <StarIcon
                                                    sx={{
                                                        fontSize: 16,
                                                        color: "#FFB400",
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    fontWeight={600}
                                                >
                                                    {meal.rating}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    • {meal.origin}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={0.3}
                                                    alignItems="center"
                                                >
                                                    <AccessTimeIcon
                                                        sx={{
                                                            fontSize: 13,
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
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    color="primary"
                                                    fontWeight={700}
                                                >
                                                    {formatPrice(meal.price)}đ
                                                </Typography>
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
                )}
            </MotionBox>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    component={RouterLink}
                    to="/menu"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        background:
                            "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                        "&:hover": {
                            background:
                                "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                        },
                    }}
                >
                    Xem thêm món ăn tại đây
                </Button>
            </Box>
        </SectionLayout>
    );
}

export default MenuSection;
