/**
 * useState: Quản lý trạng thái form, stepper, trạng thái đặt hàng.
 * useContext (useAuth, useCart): Lấy thông tin người dùng, giỏ hàng, clear cart toàn app.
 * useNavigate: Điều hướng sau khi đặt hàng hoặc khi giỏ hàng trống.
 */

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import PersonIcon from "@mui/icons-material/Person";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Stack,
    Step,
    StepLabel,
    Stepper,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatters";

const steps = ["Thông tin giao hàng", "Phương thức thanh toán", "Xác nhận"];

function Checkout() {
    const navigate = useNavigate();
    const qrImagePath = "/assets/images/payment/qr-thanh-toan.png";

    // Lấy thông tin người dùng và giỏ hàng từ context.
    const { user } = useAuth();
    const { cartItems, totalPrice, clearCart } = useCart();

    // State cho stepper và trạng thái đặt hàng.
    const [activeStep, setActiveStep] = useState(0);
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Dữ liệu form giao hàng/thanh toán.
    const [formData, setFormData] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: "",
        note: "",
        paymentMethod: "cod",
    });

    // Cập nhật form theo input.
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Điều hướng bước trong stepper.
    const handleNext = () => {
        setActiveStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setActiveStep((prev) => prev - 1);
    };

    // Mô phỏng đặt hàng thành công.
    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
    };

    // Không có sản phẩm thì quay về menu.
    if (cartItems.length === 0 && !orderPlaced) {
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
                <Typography variant="h5" gutterBottom>
                    Giỏ hàng trống
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán
                </Typography>
                <Button variant="contained" onClick={() => navigate("/menu")}>
                    Xem thực đơn
                </Button>
            </SectionLayout>
        );
    }

    // Order Success UI
    if (orderPlaced) {
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
                    <CheckCircleOutlineIcon
                        sx={{ fontSize: 120, color: "success.main", mb: 3 }}
                    />
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                        Đặt hàng thành công!
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Cảm ơn bạn đã đặt hàng tại ReFood
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 4 }}>
                        Đơn hàng sẽ được giao trong vòng 30-45 phút
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                            variant="contained"
                            onClick={() => navigate("/")}
                        >
                            Về trang chủ
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/menu")}
                        >
                            Tiếp tục mua sắm
                        </Button>
                    </Stack>
                </AnimatedSection>
            </SectionLayout>
        );
    }

    // Render step content
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Stack spacing={3}>
                        <Typography variant="h6" fontWeight={600}>
                            <PersonIcon
                                sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Thông tin người nhận
                        </Typography>
                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={2}
                        >
                            <TextField
                                fullWidth
                                label="Họ và tên"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Số điện thoại"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </Stack>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Typography variant="h6" fontWeight={600}>
                            <LocalShippingIcon
                                sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Địa chỉ giao hàng
                        </Typography>
                        <TextField
                            fullWidth
                            label="Địa chỉ chi tiết"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                            required
                            multiline
                            rows={2}
                        />
                        <TextField
                            fullWidth
                            label="Ghi chú"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="VD: Gọi trước khi giao, để trước cửa..."
                            multiline
                            rows={2}
                        />
                    </Stack>
                );

            case 1:
                return (
                    <Stack spacing={3}>
                        <Typography variant="h6" fontWeight={600}>
                            <PaymentIcon
                                sx={{ mr: 1, verticalAlign: "middle" }}
                            />
                            Phương thức thanh toán
                        </Typography>
                        <FormControl>
                            <RadioGroup
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleChange}
                            >
                                <Card
                                    variant={
                                        formData.paymentMethod === "cod"
                                            ? "outlined"
                                            : "elevation"
                                    }
                                    sx={{
                                        mb: 2,
                                        borderColor:
                                            formData.paymentMethod === "cod"
                                                ? "primary.main"
                                                : "divider",
                                        borderWidth: 2,
                                    }}
                                >
                                    <CardContent>
                                        <FormControlLabel
                                            value="cod"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography
                                                        fontWeight={600}
                                                    >
                                                        Thanh toán khi nhận hàng
                                                        (COD)
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Thanh toán bằng tiền mặt
                                                        khi nhận hàng
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </CardContent>
                                </Card>
                                <Card
                                    variant={
                                        formData.paymentMethod === "banking"
                                            ? "outlined"
                                            : "elevation"
                                    }
                                    sx={{
                                        mb: 2,
                                        borderColor:
                                            formData.paymentMethod === "banking"
                                                ? "primary.main"
                                                : "divider",
                                        borderWidth: 2,
                                    }}
                                >
                                    <CardContent>
                                        <FormControlLabel
                                            value="banking"
                                            control={<Radio />}
                                            label={
                                                <Box>
                                                    <Typography
                                                        fontWeight={600}
                                                    >
                                                        Chuyển khoản ngân hàng
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Chuyển khoản trước qua
                                                        tài khoản ngân hàng của
                                                        cửa hàng
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </CardContent>
                                </Card>
                            </RadioGroup>
                        </FormControl>
                        {formData.paymentMethod !== "cod" && (
                            <Card
                                variant="outlined"
                                sx={{
                                    borderStyle: "dashed",
                                    bgcolor: "background.default",
                                }}
                            >
                                <CardContent>
                                    <Stack
                                        spacing={2}
                                        alignItems="center"
                                        textAlign="center"
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            fontWeight={700}
                                        >
                                            Quét mã QR để thanh toán
                                        </Typography>
                                        <Box
                                            component="img"
                                            src={qrImagePath}
                                            alt="QR thanh toan"
                                            sx={{
                                                width: 220,
                                                maxWidth: "100%",
                                                borderRadius: 3,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                bgcolor: "#fff",
                                                p: 1.5,
                                            }}
                                        />
                                    </Stack>
                                </CardContent>
                            </Card>
                        )}
                    </Stack>
                );

            case 2:
                return (
                    <Stack spacing={3}>
                        <Typography variant="h6" fontWeight={600}>
                            Xác nhận đơn hàng
                        </Typography>
                        <Alert severity="info">
                            Vui lòng kiểm tra lại thông tin trước khi đặt hàng
                        </Alert>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Thông tin người nhận
                                </Typography>
                                <Typography fontWeight={600}>
                                    {formData.name}
                                </Typography>
                                <Typography variant="body2">
                                    {formData.phone}
                                </Typography>
                                <Typography variant="body2">
                                    {formData.email}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Địa chỉ giao hàng
                                </Typography>
                                <Typography variant="body2">
                                    {formData.address || "Chưa nhập"}
                                </Typography>
                                {formData.note && (
                                    <>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Ghi chú
                                        </Typography>
                                        <Typography variant="body2">
                                            {formData.note}
                                        </Typography>
                                    </>
                                )}
                                <Divider sx={{ my: 2 }} />
                                <Typography
                                    variant="subtitle2"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    Phương thức thanh toán
                                </Typography>
                                <Typography variant="body2">
                                    {formData.paymentMethod === "cod"
                                        ? "Thanh toán khi nhận hàng (COD)"
                                        : "Chuyển khoản ngân hàng"}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Stack>
                );

            default:
                return null;
        }
    };

    return (
        <SectionLayout
            variant="wide"
            bgcolor="background.default"
            sx={{ py: { xs: 4, md: 6 } }}
        >
            <AnimatedSection variant="fadeUp">
                <Typography variant="h3" fontWeight={700} sx={{ mb: 4 }}>
                    Thanh Toán
                </Typography>
            </AnimatedSection>

            <Grid container spacing={4}>
                {/* Checkout Form */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <AnimatedSection variant="fadeUp" delay={0.1}>
                        {/* Stepper */}
                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {/* Step Content */}
                        <Card>
                            <CardContent sx={{ p: { xs: 2, md: 4 } }}>
                                {renderStepContent(activeStep)}

                                {/* Navigation Buttons */}
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    sx={{ mt: 4 }}
                                >
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                    >
                                        Quay lại
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button
                                            variant="contained"
                                            size="large"
                                            onClick={handlePlaceOrder}
                                            sx={{
                                                px: 4,
                                                background:
                                                    "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                            }}
                                        >
                                            Đặt hàng
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                        >
                                            Tiếp tục
                                        </Button>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>

                {/* Order Summary */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <AnimatedSection variant="fadeUp" delay={0.2}>
                        <Card sx={{ position: "sticky", top: 100 }}>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    gutterBottom
                                >
                                    Đơn hàng ({cartItems.length} món)
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                <Stack
                                    spacing={2}
                                    sx={{ maxHeight: 300, overflow: "auto" }}
                                >
                                    {cartItems.map((item) => (
                                        <Stack
                                            key={item._id}
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                >
                                                    {item.name}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    x{item.quantity}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                variant="body2"
                                                fontWeight={600}
                                            >
                                                {formatPrice(
                                                    item.price * item.quantity
                                                )}
                                                đ
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                                <Divider sx={{ my: 2 }} />
                                <Stack spacing={1}>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography color="text.secondary">
                                            Tạm tính
                                        </Typography>
                                        <Typography>
                                            {formatPrice(totalPrice)}đ
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
                                            {formatPrice(totalPrice)}đ
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default Checkout;
