/**
 * VolunteerSection.jsx - Section đăng ký thiện nguyện
 *
 * Theo kiến thức React Hooks:
 * - Sử dụng custom hook useForm để quản lý form state
 */

import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import ElderlyIcon from "@mui/icons-material/Elderly";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import AnimatedSection from "../common/AnimatedSection";
import SectionLayout from "../layout/SectionLayout";

const volunteerBenefits = [
    {
        icon: <ElderlyIcon sx={{ fontSize: 40 }} />,
        title: "Chăm sóc người già neo đơn",
        desc: "Giao bữa ăn miễn phí hàng ngày đến tận nhà các cụ ông, cụ bà neo đơn trong khu vực",
    },
    {
        icon: <DeliveryDiningIcon sx={{ fontSize: 40 }} />,
        title: "Phục vụ quán ăn 0đ",
        desc: "Tham gia phục vụ tại quán ăn 0đ, mang bữa ăn ấm lòng cho người lao động khó khăn",
    },
    {
        icon: <GroupsIcon sx={{ fontSize: 40 }} />,
        title: "Xây dựng cộng đồng",
        desc: "Kết nối với hàng trăm nhóm thiện nguyện, cùng nhau tạo nên mạng lưới yêu thương",
    },
];

const impactStats = [
    { number: "10,000+", label: "Suất ăn đã trao" },
    { number: "500+", label: "Tình nguyện viên" },
    { number: "50+", label: "Quán ăn 0 đồng" },
    { number: "1,200+", label: "Người già được hỗ trợ" },
];

function VolunteerSection() {
    // useState để quản lý form state
    const [form, setForm] = useState({
        groupName: "",
        representative: "",
        phone: "",
        email: "",
        area: "",
        activity: "",
        members: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý submit form
        console.log("Form submitted:", form);
        alert("Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.");
    };

    return (
        <SectionLayout id="volunteer" bgcolor="background.default">
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="center"
                        sx={{ mb: 1 }}
                    >
                        <VolunteerActivismIcon
                            color="secondary"
                            fontSize="large"
                        />
                        <Typography variant="h3" fontWeight={700}>
                            Cổng Đăng Ký Thiện Nguyện
                        </Typography>
                    </Stack>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: "auto" }}
                    >
                        Hãy cùng chúng tôi mang yêu thương đến với những người
                        cần giúp đỡ — Đăng ký nhóm thiện nguyện ngay hôm nay
                    </Typography>
                </Box>
            </AnimatedSection>

            <Grid container spacing={5}>
                {/* Registration form */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeRight" delay={0.1}>
                        <Card
                            sx={{
                                p: { xs: 2, md: 3 },
                                border: "2px solid",
                                borderColor: "secondary.light",
                                background: (theme) =>
                                    theme.palette.mode === "light"
                                        ? "linear-gradient(180deg, #FFFFFF 0%, #E8F5E9 100%)"
                                        : "linear-gradient(180deg, #1E1E1E 0%, #0a1f0d 100%)",
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    fontWeight={700}
                                    sx={{ mb: 3 }}
                                >
                                    📝 Đăng Ký Nhóm Thiện Nguyện
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit}>
                                    <Stack spacing={2.5}>
                                        <TextField
                                            fullWidth
                                            label="Tên nhóm thiện nguyện"
                                            name="groupName"
                                            placeholder="VD: Nhóm Bếp Yêu Thương Q.1"
                                            value={form.groupName}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Người đại diện"
                                            name="representative"
                                            placeholder="Họ và tên người đại diện"
                                            value={form.representative}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <Stack
                                            direction={{
                                                xs: "column",
                                                sm: "row",
                                            }}
                                            spacing={2}
                                        >
                                            <TextField
                                                fullWidth
                                                label="Số điện thoại"
                                                name="phone"
                                                placeholder="0901 234 567"
                                                value={form.phone}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                placeholder="email@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                variant="outlined"
                                            />
                                        </Stack>
                                        <TextField
                                            fullWidth
                                            label="Khu vực hoạt động"
                                            name="area"
                                            placeholder="VD: Quận 1, TP.HCM"
                                            value={form.area}
                                            onChange={handleChange}
                                            variant="outlined"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Hoạt động muốn tham gia"
                                            name="activity"
                                            select
                                            value={form.activity}
                                            onChange={handleChange}
                                            variant="outlined"
                                        >
                                            <MenuItem value="">
                                                -- Chọn hoạt động --
                                            </MenuItem>
                                            <MenuItem value="elderly">
                                                Giao cơm cho người già neo đơn
                                            </MenuItem>
                                            <MenuItem value="night">
                                                Phục vụ quán ăn 0đ
                                            </MenuItem>
                                            <MenuItem value="kitchen">
                                                Hỗ trợ quán ăn 0 đồng
                                            </MenuItem>
                                            <MenuItem value="all">
                                                Tất cả hoạt động
                                            </MenuItem>
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            label="Số thành viên"
                                            name="members"
                                            placeholder="VD: 15"
                                            value={form.members}
                                            onChange={handleChange}
                                            variant="outlined"
                                            type="number"
                                        />
                                        <TextField
                                            fullWidth
                                            label="Lời nhắn (không bắt buộc)"
                                            name="message"
                                            placeholder="Chia sẻ thêm về nhóm của bạn..."
                                            value={form.message}
                                            onChange={handleChange}
                                            variant="outlined"
                                            multiline
                                            rows={3}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            startIcon={
                                                <VolunteerActivismIcon />
                                            }
                                            sx={{
                                                py: 1.8,
                                                background:
                                                    "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
                                                },
                                            }}
                                        >
                                            Gửi Đăng Ký
                                        </Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                </Grid>

                {/* Benefits & Impact */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AnimatedSection variant="fadeLeft" delay={0.2}>
                        <Stack spacing={3}>
                            {/* Benefits */}
                            {volunteerBenefits.map((benefit, index) => (
                                <Card key={index}>
                                    <CardContent>
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Avatar
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    bgcolor: "secondary.light",
                                                    color: "secondary.main",
                                                }}
                                            >
                                                {benefit.icon}
                                            </Avatar>
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                >
                                                    {benefit.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {benefit.desc}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Impact Stats */}
                            <Card
                                sx={{
                                    background:
                                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                                    color: "#fff",
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        sx={{ mb: 2, textAlign: "center" }}
                                    >
                                        🎯 Tác Động Của Chúng Tôi
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {impactStats.map((stat, index) => (
                                            <Grid size={{ xs: 6 }} key={index}>
                                                <Box
                                                    sx={{ textAlign: "center" }}
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight={800}
                                                    >
                                                        {stat.number}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {stat.label}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Stack>
                    </AnimatedSection>
                </Grid>
            </Grid>
        </SectionLayout>
    );
}

export default VolunteerSection;
