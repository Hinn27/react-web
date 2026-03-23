/**
 * useParams: Lấy tham số động từ URL (id sản phẩm).
 * useState: Quản lý trạng thái số lượng, tab, v.v.
 * useMemo/useCallback: Tối ưu hiệu suất khi tìm sản phẩm, tăng/giảm số lượng.
 * useContext (useCart): Thêm sản phẩm vào giỏ hàng toàn app.
 * useNavigate: Điều hướng khi không tìm thấy sản phẩm hoặc quay lại menu.
 */

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    Link,
    Stack,
    Tab,
    Tabs,
    Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import CardMediaSkeleton from "../components/common/CardMediaSkeleton";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";
import { allMeals } from "../data/meals";

function ProductDetail() {
    // Lấy id sản phẩm từ URL.
    const { id } = useParams();

    // Dùng để điều hướng giữa các trang.
    const navigate = useNavigate();

    const { addItem } = useCart();

    // State giao diện.
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState(0);

    // Tìm sản phẩm theo id.
    const product = useMemo(
        () => allMeals.find((meal) => meal._id === id),
        [id]
    );

    // Tăng/giảm số lượng trong khoảng 1-10.
    const increaseQty = useCallback(() => {
        setQuantity((prev) => Math.min(prev + 1, 10));
    }, []);

    const decreaseQty = useCallback(() => {
        setQuantity((prev) => Math.max(prev - 1, 1));
    }, []);

    // Thêm sản phẩm vào giỏ với số lượng đã chọn.
    const handleAddToCart = useCallback(() => {
        if (!product) return;
        addItem(
            {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
            },
            quantity
        );
    }, [addItem, product, quantity]);

    // Trường hợp id không tồn tại.
    if (!product) {
        return (
            <SectionLayout
                variant="narrow"
                sx={{
                    textAlign: "center",
                    py: 12,
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Không tìm thấy sản phẩm
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Sản phẩm với mã "{id}" không tồn tại trong hệ thống
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/menu")}
                >
                    Quay lại thực đơn
                </Button>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 3, md: 4 } }}
        >
            {/* Breadcrumbs */}
            <AnimatedSection variant="fadeUp">
                <Breadcrumbs sx={{ mb: 3 }}>
                    <Link
                        component={RouterLink}
                        to="/"
                        underline="hover"
                        color="inherit"
                    >
                        Trang chủ
                    </Link>
                    <Link
                        component={RouterLink}
                        to="/menu"
                        underline="hover"
                        color="inherit"
                    >
                        Thực đơn
                    </Link>
                    <Typography color="text.primary">{product.name}</Typography>
                </Breadcrumbs>
            </AnimatedSection>

            <Grid container spacing={4}>
                {/* Product Image */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeLeft">
                        <Card>
                            <Box sx={{ position: "relative" }}>
                                <Chip
                                    label={product.tag}
                                    size="medium"
                                    icon={<LocalFireDepartmentIcon />}
                                    sx={{
                                        position: "absolute",
                                        top: 16,
                                        left: 16,
                                        zIndex: 2,
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                                <CardMediaSkeleton
                                    component="img"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{
                                        width: "100%",
                                        aspectRatio: "4/3",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Card>
                    </AnimatedSection>
                </Grid>

                {/* Product Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeRight" delay={0.1}>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            sx={{ mb: 2 }}
                        >
                            {product.name}
                        </Typography>

                        {/* Rating & Meta */}
                        <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 3 }}
                        >
                            <Chip
                                icon={
                                    <StarIcon
                                        sx={{
                                            color: "#FFB400 !important",
                                        }}
                                    />
                                }
                                label={product.rating}
                                variant="outlined"
                                sx={{ fontWeight: 600 }}
                            />
                            <Chip
                                label={product.category}
                                color="secondary"
                                variant="outlined"
                            />
                            <Stack
                                direction="row"
                                spacing={0.5}
                                alignItems="center"
                            >
                                <AccessTimeIcon
                                    fontSize="small"
                                    color="action"
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {product.time}
                                </Typography>
                            </Stack>
                            <Typography variant="body2" color="text.secondary">
                                • {product.origin}
                            </Typography>
                        </Stack>

                        {/* Price */}
                        <Typography
                            variant="h4"
                            color="primary"
                            fontWeight={700}
                            sx={{ mb: 3 }}
                        >
                            {product.price.toLocaleString("vi-VN")}đ
                            <Typography
                                variant="body2"
                                component="span"
                                color="text.secondary"
                                sx={{ ml: 1 }}
                            >
                                /phần
                            </Typography>
                        </Typography>

                        {/* Description */}
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ mb: 3, lineHeight: 1.8 }}
                        >
                            {product.fullDesc || product.desc}
                        </Typography>

                        <Divider sx={{ my: 3 }} />

                        {/* Quantity & Add to Cart */}
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={3}
                            alignItems={{ sm: "center" }}
                        >
                            {/* Quantity Selector */}
                            <Stack direction="row" alignItems="center">
                                <Typography variant="subtitle2" sx={{ mr: 2 }}>
                                    Số lượng:
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={decreaseQty}
                                    disabled={quantity <= 1}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mx: 2,
                                        minWidth: 40,
                                        textAlign: "center",
                                    }}
                                >
                                    {quantity}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={increaseQty}
                                    disabled={quantity >= 10}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>

                            {/* Add to Cart Button */}
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShoppingCartIcon />}
                                onClick={handleAddToCart}
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                    },
                                }}
                            >
                                Thêm vào giỏ —{" "}
                                {(product.price * quantity).toLocaleString(
                                    "vi-VN"
                                )}
                                đ
                            </Button>
                        </Stack>
                    </AnimatedSection>
                </Grid>
            </Grid>

            {/* Tabs - Info, Reviews, etc. */}
            <AnimatedSection variant="fadeUp" delay={0.2}>
                <Card sx={{ mt: 6 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, v) => setActiveTab(v)}
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                    >
                        <Tab label="Thông tin chi tiết" />
                        <Tab label="Đánh giá" />
                        <Tab label="Chính sách" />
                    </Tabs>
                    <CardContent>
                        {activeTab === 0 && (
                            <Box>
                                <Typography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    Mô tả sản phẩm
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.8 }}
                                >
                                    {product.fullDesc || product.desc}
                                    <br />
                                    <br />
                                    Món ăn được chế biến từ nguyên liệu tươi
                                    sạch, đảm bảo vệ sinh an toàn thực phẩm.
                                    Phục vụ cả ngày, đặc biệt hỗ trợ người lao
                                    động ca đêm.
                                </Typography>
                            </Box>
                        )}
                        {activeTab === 1 && (
                            <Box>
                                <Typography color="text.secondary">
                                    Chưa có đánh giá nào cho sản phẩm này.
                                </Typography>
                            </Box>
                        )}
                        {activeTab === 2 && (
                            <Box>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight={600}
                                    gutterBottom
                                >
                                    Chính sách đổi trả
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Đổi trả miễn phí nếu sản phẩm không đúng như
                                    mô tả hoặc có vấn đề về chất lượng.
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default ProductDetail;
