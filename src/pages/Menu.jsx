/**
 * Trang menu.
 * Kien thuc ap dung:
 * - useState cho search/category/page
 * - useMemo cho filter + pagination
 * - useCallback cho event handler
 * - useSearchParams + Link cua React Router
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SearchIcon from "@mui/icons-material/Search";
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
    InputAdornment,
    Pagination,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import CardMediaSkeleton from "../components/common/CardMediaSkeleton";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";
import { allMeals, categories } from "../data/meals";

function Menu() {
    const { addItem } = useCart();

    // useSearchParams hook - có thể dùng để sync state với URL query
    // Ví dụ: const [searchParams, setSearchParams] = useSearchParams();
    // Lấy category từ URL: searchParams.get('category')
    const [searchParams] = useSearchParams();

    // useState cho filter state
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [page, setPage] = useState(1);

    const itemsPerPage = 8;

    /**
     * useMemo để filter meals
     * Chỉ tính toán lại khi search hoặc category thay đổi
     * Tránh tính toán lại không cần thiết khi re-render
     */
    const filteredMeals = useMemo(() => {
        return allMeals.filter((meal) => {
            const matchSearch = meal.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchCategory =
                category === "Tất cả" || meal.category === category;
            return matchSearch && matchCategory;
        });
    }, [search, category]);

    // useMemo cho pagination
    const totalPages = useMemo(
        () => Math.ceil(filteredMeals.length / itemsPerPage),
        [filteredMeals.length]
    );

    const paginatedMeals = useMemo(
        () =>
            filteredMeals.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [filteredMeals, page]
    );

    // Reset page khi filter thay đổi
    const handleSearchChange = useCallback((e) => {
        setSearch(e.target.value);
        setPage(1);
    }, []);

    const handleCategoryChange = useCallback((e, val) => {
        if (val) {
            setCategory(val);
            setPage(1);
        }
    }, []);

    // useCallback cho pagination handler
    const handlePageChange = useCallback((event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // useCallback cho add to cart
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

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <RestaurantMenuIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box>
                        <Typography variant="h3" fontWeight={700}>
                            Thực Đơn
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Các món ăn phục vụ 24/7 — Đặc biệt hỗ trợ ca đêm
                        </Typography>
                    </Box>
                </Stack>
            </AnimatedSection>

            {/* Search & Filter */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={2}
                    alignItems={{ md: "center" }}
                    sx={{ mb: 4, mt: 3 }}
                >
                    <TextField
                        placeholder="Tìm món ăn..."
                        value={search}
                        onChange={handleSearchChange}
                        sx={{ minWidth: { md: 320 } }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <ToggleButtonGroup
                        value={category}
                        exclusive
                        onChange={handleCategoryChange}
                        size="small"
                        sx={{
                            flexWrap: "wrap",
                            "& .MuiToggleButton-root": {
                                borderRadius: "20px !important",
                                border: "1px solid",
                                borderColor: "divider",
                                mx: 0.5,
                                my: 0.5,
                                px: 2,
                                textTransform: "none",
                                fontWeight: 500,
                                "&.Mui-selected": {
                                    bgcolor: "primary.main",
                                    color: "#fff",
                                    "&:hover": {
                                        bgcolor: "primary.dark",
                                    },
                                },
                            },
                        }}
                    >
                        {categories.map((cat) => (
                            <ToggleButton key={cat} value={cat}>
                                {cat}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                </Stack>
            </AnimatedSection>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tìm thấy <strong>{filteredMeals.length}</strong> món ăn
            </Typography>

            {/* Meals grid */}
            <AnimatedSection variant="fadeUp" delay={0.25}>
                {filteredMeals.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                        <Typography variant="h5" color="text.secondary">
                            Không tìm thấy món ăn phù hợp
                        </Typography>
                        <Button
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setSearch("");
                                setCategory("Tất cả");
                            }}
                        >
                            Xóa bộ lọc
                        </Button>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        {paginatedMeals.map((meal) => (
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={meal._id}
                            >
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
                                    {/* Link đến trang chi tiết sản phẩm */}
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
                                    <CardContent sx={{ flexGrow: 1, pb: 1.5 }}>
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={700}
                                            gutterBottom
                                            component={RouterLink}
                                            to={`/product/${meal._id}`}
                                            sx={{
                                                textDecoration: "none",
                                                color: "text.primary",
                                                "&:hover": {
                                                    color: "primary.main",
                                                },
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
                                            {meal.desc}
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
                                                {meal.price.toLocaleString(
                                                    "vi-VN"
                                                )}
                                                đ
                                            </Typography>
                                            <Tooltip title="Thêm vào giỏ">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleAddToCart(meal)
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
                            </Grid>
                        ))}
                    </Grid>
                )}
            </AnimatedSection>

            {/* Pagination */}
            {totalPages > 1 && (
                <Stack alignItems="center" sx={{ mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Stack>
            )}
        </SectionLayout>
    );
}

export default Menu;
