/**
 * useState: Quản lý trạng thái form và hiển thị lỗi.
 * useNavigate: Điều hướng sau khi đăng nhập thành công.
 * useContext (useAuth): Quản lý xác thực, chia sẻ state đăng nhập toàn app.
 * React Router Link: Điều hướng không reload trang.
 */

import LoginIcon from "@mui/icons-material/Login";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";
import { useAuth } from "../context/AuthContext";

function Login() {
    // Điều hướng sau khi đăng nhập.
    const navigate = useNavigate();

    // Action đăng nhập từ context.
    const { login } = useAuth();

    // State cho giao diện.
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // State cho form.
    const [form, setForm] = useState({ email: "", password: "" });

    // Cập nhật giá trị form.
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    // Submit đăng nhập.
    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu bắt buộc.
        if (!form.email || !form.password) {
            setError("Vui lòng nhập đầy đủ email và mật khẩu");
            return;
        }

        // Demo login.
        login({
            id: "1",
            name: "Người dùng ReFood",
            email: form.email,
            role: "user",
        });

        navigate("/");
    };

    return (
        <SectionLayout
            variant="narrow"
            sx={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                py: 6,
                background: (theme) =>
                    theme.palette.mode === "light"
                        ? "linear-gradient(135deg, #FFF3E0 0%, #E8F5E9 100%)"
                        : "linear-gradient(135deg, #1a1205 0%, #0a1f0d 100%)",
            }}
        >
            <AnimatedSection variant="scale" delay={0.1}>
                <Card sx={{ p: { xs: 2, md: 4 } }}>
                    <CardContent>
                        {/* Logo */}
                        <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
                            <RestaurantIcon
                                sx={{ fontSize: 48, color: "primary.main" }}
                            />
                            <Typography
                                variant="h4"
                                fontWeight={800}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ReFood
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Đăng nhập để đặt suất ăn & tham gia thiện nguyện
                            </Typography>
                        </Stack>

                        {/* Error Alert */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Login Form */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                />
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Nhập mật khẩu"
                                    value={form.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOffIcon />
                                                        ) : (
                                                            <VisibilityIcon />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<LoginIcon />}
                                    sx={{
                                        py: 1.5,
                                        background:
                                            "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                                        },
                                    }}
                                >
                                    Đăng Nhập
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                hoặc
                            </Typography>
                        </Divider>

                        {/* Link đến trang đăng ký */}
                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="text.secondary"
                        >
                            Chưa có tài khoản?{" "}
                            <Typography
                                component={RouterLink}
                                to="/register"
                                variant="body2"
                                color="primary"
                                fontWeight={600}
                                sx={{ textDecoration: "none" }}
                            >
                                Đăng ký ngay
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Login;
