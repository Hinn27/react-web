/**
 * Register.jsx - Trang đăng ký
 *
 * Theo kiến thức React Hooks:
 * - useState: Quản lý form state phức tạp với nhiều fields
 *
 * Theo kiến thức React Router Dom:
 * - useNavigate: Điều hướng sau khi đăng ký thành công
 * - Link: Tạo liên kết đến trang đăng nhập
 */

import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";
import { useAuth } from "../context/AuthContext";

function Register() {
    // useNavigate hook để điều hướng programmatically
    const navigate = useNavigate();

    // useAuth custom hook
    const { login } = useAuth();

    // useState cho UI state
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    // useState cho form state - nhiều fields
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "user",
    });

    // Handler cho form input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError("");
    };

    // Handler cho form submit
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!form.name || !form.email || !form.phone || !form.password) {
            setError("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        if (form.password.length < 6) {
            setError("Mật khẩu phải có ít nhất 6 ký tự");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Mật khẩu xác nhận không khớp");
            return;
        }

        // Mock register — thay bằng API
        login({
            id: "1",
            name: form.name,
            email: form.email,
            phone: form.phone,
            role: form.role,
        });

        // Điều hướng về trang chủ
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
                        ? "linear-gradient(135deg, #E8F5E9 0%, #FFF3E0 100%)"
                        : "linear-gradient(135deg, #0a1f0d 0%, #1a1205 100%)",
            }}
        >
            <AnimatedSection variant="scale" delay={0.1}>
                <Card sx={{ p: { xs: 2, md: 4 } }}>
                    <CardContent>
                        {/* Logo */}
                        <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
                            <RestaurantIcon
                                sx={{ fontSize: 48, color: "secondary.main" }}
                            />
                            <Typography
                                variant="h4"
                                fontWeight={800}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #2E7D32 0%, #E8651A 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Tạo Tài Khoản
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tham gia ReFood — Kết nối yêu thương
                            </Typography>
                        </Stack>

                        {/* Error Alert */}
                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Register Form */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="Họ và tên"
                                    name="name"
                                    placeholder="Nguyễn Văn A"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="email@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Số điện thoại"
                                        name="phone"
                                        placeholder="0901 234 567"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </Stack>
                                <TextField
                                    fullWidth
                                    label="Bạn là..."
                                    name="role"
                                    select
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="user">
                                        Người lao động / Khách hàng
                                    </MenuItem>
                                    <MenuItem value="volunteer">
                                        Tình nguyện viên
                                    </MenuItem>
                                    <MenuItem value="restaurant">
                                        Chủ quán ăn 0 đồng
                                    </MenuItem>
                                </TextField>
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Tối thiểu 6 ký tự"
                                    value={form.password}
                                    onChange={handleChange}
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
                                <TextField
                                    fullWidth
                                    label="Xác nhận mật khẩu"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    startIcon={<PersonAddIcon />}
                                    sx={{
                                        py: 1.5,
                                        background:
                                            "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                        },
                                    }}
                                >
                                    Đăng Ký
                                </Button>
                            </Stack>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2" color="text.secondary">
                                hoặc
                            </Typography>
                        </Divider>

                        {/* Link đến trang đăng nhập */}
                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="text.secondary"
                        >
                            Đã có tài khoản?{" "}
                            <Typography
                                component={RouterLink}
                                to="/login"
                                variant="body2"
                                color="primary"
                                fontWeight={600}
                                sx={{ textDecoration: "none" }}
                            >
                                Đăng nhập
                            </Typography>
                        </Typography>
                    </CardContent>
                </Card>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Register;
