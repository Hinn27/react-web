/**
 * Cart.jsx - Trang giỏ hàng
 *
 * Theo kiến thức useContext:
 * - Sử dụng useCart (custom hook bọc useContext) để truy cập CartContext
 * - Tránh prop drilling - không cần truyền cart data qua nhiều tầng component
 *
 * Theo kiến thức React Router Dom:
 * - useNavigate: Điều hướng đến trang thanh toán
 * - Link: Tạo liên kết đến trang menu (tiếp tục mua sắm)
 */

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveIcon from "@mui/icons-material/Remove";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import CardMediaSkeleton from "../components/common/CardMediaSkeleton";
import SectionLayout from "../components/layout/SectionLayout";
import { useCart } from "../context/CartContext";

function Cart() {
    const navigate = useNavigate();

    /**
     * useCart - Custom Hook sử dụng useContext
     *
     * Theo kiến thức: Context giúp tránh prop drilling
     * Thay vì truyền cartItems, addItem, removeItem... qua nhiều tầng,
     * bất kỳ component nào cũng có thể truy cập thông qua useContext
     */
    const {
        cartItems,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        clearCart,
    } = useCart();

    // Empty cart UI
    if (cartItems.length === 0) {
        return (
            <SectionLayout
                variant="narrow"
                sx={{
                    textAlign: "center",
                    py: 12,
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <AnimatedSection variant="scale">
                    <RemoveShoppingCartIcon
                        sx={{
                            fontSize: 120,
                            color: "text.disabled",
                            mb: 3,
                        }}
                    />
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Giỏ hàng trống
                    </Typography>
                    <Typography
                        color="text.secondary"
                        sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
                    >
                        Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá
                        thực đơn của chúng tôi!
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        component={RouterLink}
                        to="/menu"
                        startIcon={<ShoppingBagIcon />}
                        sx={{
                            px: 4,
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                        }}
                    >
                        Xem thực đơn
                    </Button>
                </AnimatedSection>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            <AnimatedSection variant="fadeUp">
                <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
                    Giỏ Hàng{" "}
                    <Typography
                        component="span"
                        variant="h5"
                        color="text.secondary"
                    >
                        ({totalItems} món)
                    </Typography>
                </Typography>
            </AnimatedSection>

            <Grid container spacing={4}>
                {/* Cart Items - Desktop */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <AnimatedSection variant="fadeUp" delay={0.1}>
                        <TableContainer
                            component={Paper}
                            sx={{
                                display: { xs: "none", md: "block" },
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell align="center">
                                            Đơn giá
                                        </TableCell>
                                        <TableCell align="center">
                                            Số lượng
                                        </TableCell>
                                        <TableCell align="center">
                                            Thành tiền
                                        </TableCell>
                                        <TableCell align="center">
                                            Xóa
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                >
                                                    <CardMediaSkeleton
                                                        component="img"
                                                        image={`https://picsum.photos/seed/${item._id}/100/100`}
                                                        alt={item.name}
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            borderRadius: 2,
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                    <Typography
                                                        fontWeight={600}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography>
                                                    {item.price.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    đ
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack
                                                    direction="row"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                >
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            removeItem(item._id)
                                                        }
                                                    >
                                                        <RemoveIcon fontSize="small" />
                                                    </IconButton>
                                                    <Typography sx={{ mx: 2 }}>
                                                        {item.quantity}
                                                    </Typography>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            addItem(item, 1)
                                                        }
                                                    >
                                                        <AddIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography
                                                    fontWeight={700}
                                                    color="primary"
                                                >
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toLocaleString("vi-VN")}
                                                    đ
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Tooltip title="Xóa sản phẩm">
                                                    <IconButton
                                                        color="error"
                                                        onClick={() =>
                                                            removeItem(
                                                                item._id,
                                                                item.quantity
                                                            )
                                                        }
                                                    >
                                                        <DeleteOutlineIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Cart Items - Mobile */}
                        <Stack
                            spacing={2}
                            sx={{ display: { xs: "flex", md: "none" } }}
                        >
                            {cartItems.map((item) => (
                                <Card key={item._id}>
                                    <CardContent>
                                        <Stack direction="row" spacing={2}>
                                            <CardMediaSkeleton
                                                component="img"
                                                image={`https://picsum.photos/seed/${item._id}/100/100`}
                                                alt={item.name}
                                                sx={{
                                                    width: 80,
                                                    height: 80,
                                                    borderRadius: 2,
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography fontWeight={600}>
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {item.price.toLocaleString(
                                                        "vi-VN"
                                                    )}
                                                    đ/phần
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    sx={{ mt: 1 }}
                                                >
                                                    <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                    >
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                removeItem(
                                                                    item._id
                                                                )
                                                            }
                                                        >
                                                            <RemoveIcon fontSize="small" />
                                                        </IconButton>
                                                        <Typography
                                                            sx={{ mx: 1 }}
                                                        >
                                                            {item.quantity}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                addItem(item, 1)
                                                            }
                                                        >
                                                            <AddIcon fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                    <Typography
                                                        fontWeight={700}
                                                        color="primary"
                                                    >
                                                        {(
                                                            item.price *
                                                            item.quantity
                                                        ).toLocaleString(
                                                            "vi-VN"
                                                        )}
                                                        đ
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() =>
                                                    removeItem(
                                                        item._id,
                                                        item.quantity
                                                    )
                                                }
                                            >
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>

                        {/* Tiếp tục mua sắm & Xóa giỏ hàng */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            sx={{ mt: 3 }}
                        >
                            <Button
                                component={RouterLink}
                                to="/menu"
                                startIcon={<ShoppingBagIcon />}
                            >
                                Tiếp tục mua hàng
                            </Button>
                            <Button
                                color="error"
                                startIcon={<DeleteOutlineIcon />}
                                onClick={clearCart}
                            >
                                Xóa giỏ hàng
                            </Button>
                        </Stack>
                    </AnimatedSection>
                </Grid>

                {/* Order Summary */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnimatedSection variant="fadeUp" delay={0.2}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    Tóm tắt đơn hàng
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1.5}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography color="text.secondary">
                                            Tạm tính ({totalItems} món)
                                        </Typography>
                                        <Typography>
                                            {totalPrice.toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography color="text.secondary">
                                            Phí giao hàng
                                        </Typography>
                                        <Typography color="secondary.main">
                                            Miễn phí
                                        </Typography>
                                    </Stack>
                                    <Divider />
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                        >
                                            Tổng cộng
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            color="primary"
                                        >
                                            {totalPrice.toLocaleString("vi-VN")}
                                            đ
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        background:
                                            "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    }}
                                    startIcon={<ShoppingCartCheckoutIcon />}
                                    onClick={() => navigate("/checkout")}
                                >
                                    Tiến hành thanh toán
                                </Button>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default Cart;
