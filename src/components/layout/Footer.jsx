/**
 * Footer.jsx - Footer Component
 * Kiến thức áp dụng:
 * - React Router `Link` (NavLink) thay vì thẻ `a` để tránh reload trang
 * - Grid layout responsive
 */

import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
    Box,
    Divider,
    Grid,
    IconButton,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LAYOUT_MAX_WIDTH, RESPONSIVE_PX } from "./SectionLayout";

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "light" ? "#2D2D2D" : "#0a0a0a",
                color: "#E0E0E0",
                pt: { xs: 6, md: 8 },
                pb: 3,
            }}
        >
            <Box
                sx={{
                    maxWidth: LAYOUT_MAX_WIDTH.default,
                    mx: "auto",
                    px: RESPONSIVE_PX,
                    width: "100%",
                }}
            >
                <Grid container spacing={4}>
                    {/* Brand */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mb: 2 }}
                        >
                            <RestaurantIcon
                                sx={{ fontSize: 28, color: "#E8651A" }}
                            />
                            <Typography
                                variant="h5"
                                fontWeight={800}
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #4CAF50 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                ReFood
                            </Typography>
                        </Stack>
                        <Typography
                            variant="body2"
                            sx={{ color: "#B0B0B0", mb: 2, maxWidth: 320 }}
                        >
                            Kết nối yêu thương — Phục vụ bữa ăn chất lượng cho
                            người lao động ban đêm với dịch vụ nhanh và ổn định.
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <IconButton sx={{ color: "#4267B2" }}>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#FF0000" }}>
                                <YouTubeIcon />
                            </IconButton>
                            <IconButton sx={{ color: "#E8651A" }}>
                                <EmailIcon />
                            </IconButton>
                        </Stack>
                    </Grid>

                    {/* Quick links — sử dụng RouterLink thay vì href */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 2 }}
                        >
                            Liên Kết Nhanh
                        </Typography>
                        <Stack spacing={1}>
                            {[
                                { label: "Thực đơn", to: "/menu" },
                                { label: "Giỏ hàng", to: "/cart" },
                                { label: "Về chúng tôi", to: "/about" },
                                {
                                    label: "Chính sách bảo mật",
                                    to: "/privacy",
                                },
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    component={RouterLink}
                                    to={link.to}
                                    underline="hover"
                                    sx={{
                                        color: "#B0B0B0",
                                        "&:hover": { color: "#E8651A" },
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Typography
                            variant="h6"
                            fontWeight={700}
                            sx={{ mb: 2 }}
                        >
                            Liên Hệ
                        </Typography>
                        <Stack spacing={1.5}>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <PhoneIcon
                                    sx={{ fontSize: 18, color: "#4CAF50" }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#B0B0B0" }}
                                >
                                    Hotline: 1900 1009 (Miễn phí)
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="center"
                            >
                                <EmailIcon
                                    sx={{ fontSize: 18, color: "#E8651A" }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#B0B0B0" }}
                                >
                                    contact@refood.org
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                spacing={1}
                                alignItems="flex-start"
                            >
                                <LocationOnIcon
                                    sx={{
                                        fontSize: 18,
                                        color: "#E8651A",
                                        mt: 0.3,
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{ color: "#B0B0B0" }}
                                >
                                    Trường Đại học Đông Á, Đà Nẵng, Việt Nam
                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                >
                    <Typography variant="body2" sx={{ color: "#888" }}>
                        © 2026 ReFood. All rights reserved.
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#888",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                        }}
                    >
                        Made with{" "}
                        <FavoriteIcon sx={{ fontSize: 14, color: "#E8651A" }} />{" "}
                        by Hin
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}

export default Footer;
