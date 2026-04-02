/**
 * 1. Functional Component là tiêu chuẩn cho dự án mới (React >=16.8).
 * 2. useState: Quản lý trạng thái động, mỗi lần setState sẽ REPLACE, không merge như class.
 * 3. useMemo/useCallback: Tối ưu hiệu suất, chỉ dùng khi có tính toán nặng hoặc function truyền xuống props.
 * 4. useContext: Tránh props drilling, chia sẻ state/actions toàn app (giỏ hàng).
 * 5. useSearchParams: Kết nối UI với query string, giúp chia sẻ trạng thái filter qua URL.
 * 6. Custom hooks: useProducts (quản lý sản phẩm), useDebounce (tối ưu search input).
 * 7. UI thực chiến: Lọc, tìm kiếm, phân trang, thêm vào giỏ hàng, feedback người dùng.
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
    Alert,
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
    Paper,
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
import { categories } from "../data/meals";
import useDebounce from "../hooks/useDebounce";
import useProducts from "../hooks/useProducts";
import { formatPrice } from "../utils/formatters";

/**
 * Component trang thực đơn.
 * Nhiệm vụ chính:
 * - Thêm món vào giỏ hàng
 * - Lọc món theo từ khóa + danh mục
 * - Số món trong 1 trang
 */
function Menu() {
    // 4. useContext: Lấy action thêm vào giỏ hàng từ CartContext (tránh props drilling)
    const { addItem } = useCart();

    // 5. useSearchParams: Chuẩn bị đồng bộ filter với query string trên URL
    const [searchParams] = useSearchParams();

    // 6. Custom hook useProducts: Quản lý danh sách sản phẩm, filter, search
    // Thay vì viết lại logic filter ở đây, ta dùng hook tái sử dụng
    const {
        products: filteredMeals,
        search,
        setSearch,
        category,
        setCategory,
        totalCount,
    } = useProducts();

    // 6. Custom hook useDebounce: Tối ưu search input, chỉ filter sau 300ms dừng gõ
    // Giúp tránh re-render liên tục khi người dùng đang gõ nhanh
    const debouncedSearch = useDebounce(search, 300);

    // 2. useState: Quản lý trạng thái phân trang
    const [page, setPage] = useState(1);

    // Số lượng món trên 1 trang
    const itemsPerPage = 10;

    // 3. useMemo: Tính số trang và cắt dữ liệu theo trang hiện tại (phân trang động)
    const totalPages = useMemo(
        () => Math.ceil(filteredMeals.length / itemsPerPage),
        [filteredMeals.length]
    );
    const paginatedMeals = useMemo(
        () =>
            filteredMeals.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [filteredMeals, page]
    );

    // 3. useCallback: Ghi nhớ function, tránh tạo mới mỗi lần render
    // Khi nhập từ khóa mới: cập nhật search và quay về trang 1
    const handleSearchChange = useCallback(
        (e) => {
            setSearch(e.target.value);
            setPage(1);
        },
        [setSearch]
    );

    // Khi đổi danh mục: cập nhật category và quay về trang 1
    const handleCategoryChange = useCallback(
        (e, val) => {
            if (val) {
                setCategory(val);
                setPage(1);
            }
        },
        [setCategory]
    );

    // Đổi trang và cuộn lên đầu để người dùng nhìn thấy danh sách ngay
    const handlePageChange = useCallback((event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // Chuẩn hóa dữ liệu món và gửi action thêm vào giỏ hàng (thực chiến: quản lý state qua context)
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

            {/* Alert thông báo nhanh ở đầu trang */}
            <AnimatedSection variant="fadeUp" delay={0.1}>
                <Alert
                    severity="info"
                    sx={{
                        mb: 3,
                        borderRadius: 3,
                        bgcolor: "rgba(232,101,26,0.08)",
                        border: "1px solid",
                        borderColor: "rgba(232,101,26,0.25)",
                    }}
                >
                    Bạn có thể tìm món theo tên, lọc theo danh mục, rồi thêm
                    nhanh vào giỏ hàng.
                </Alert>
            </AnimatedSection>

            {/* Search & Filter */}
            <AnimatedSection variant="fadeUp" delay={0.15}>
                <Paper
                    elevation={0}
                    sx={{
                        mb: 4,
                        mt: 3,
                        p: { xs: 2, md: 3 },
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        alignItems={{ md: "center" }}
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
                </Paper>
            </AnimatedSection>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tìm thấy <strong>{totalCount}</strong> món ăn
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
                                // Xóa toàn bộ bộ lọc về mặc định.
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
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                    lg: 2.4,
                                    xl: 2.4,
                                }}
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
                                                {formatPrice(meal.price)}đ
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
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}
        </SectionLayout>
    );
}

export default Menu;
