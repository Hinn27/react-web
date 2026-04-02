/**
 * Trang Về Chúng Tôi.
 * Kiến thức áp dụng:
 * - Functional Component
 * - MUI Grid, Stack, Card layout
 * - Framer Motion animation
 */

import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";

const teamMembers = [
    {
        name: "Nguyễn Văn Hin",
        role: "Founder & Developer",
        avatar: "👨‍💻",
    },
    {
        name: "Trường ĐH Đông Á",
        role: "Đối tác học thuật",
        avatar: "🏫",
    },
    {
        name: "Cộng đồng TNV",
        role: "200+ tình nguyện viên",
        avatar: "🤝",
    },
];

const values = [
    {
        icon: <FavoriteIcon sx={{ fontSize: 36 }} />,
        title: "Yêu thương",
        desc: "Lan tỏa tình yêu thương qua từng bữa ăn, kết nối con người với nhau.",
        color: "#C62828",
    },
    {
        icon: <NightsStayIcon sx={{ fontSize: 36 }} />,
        title: "Phục vụ 24/7",
        desc: "Đặc biệt hỗ trợ người lao động ca đêm — những người cần bữa ăn nóng hổi nhất.",
        color: "#1565C0",
    },
    {
        icon: <VolunteerActivismIcon sx={{ fontSize: 36 }} />,
        title: "Thiện nguyện",
        desc: "Kết nối quán ăn 0 đồng, tình nguyện viên và nhà tài trợ cho cộng đồng.",
        color: "#2E7D32",
    },
    {
        icon: <GroupsIcon sx={{ fontSize: 36 }} />,
        title: "Cộng đồng",
        desc: "Xây dựng mạng lưới hỗ trợ lẫn nhau, vì một xã hội nhân ái hơn.",
        color: "#E8651A",
    },
];

function About() {
    return (
        <Box>
            {/* Hero */}
            <SectionLayout
                sx={{
                    py: { xs: 8, md: 12 },
                    textAlign: "center",
                    background: (theme) =>
                        theme.palette.mode === "light"
                            ? "linear-gradient(135deg, #FFF3E0 0%, #E8F5E9 100%)"
                            : "linear-gradient(135deg, #1a1205 0%, #0a1f0d 100%)",
                }}
            >
                <AnimatedSection variant="fadeUp">
                    <RestaurantIcon
                        sx={{ fontSize: 64, color: "primary.main", mb: 2 }}
                    />
                    <Typography
                        variant="h2"
                        fontWeight={800}
                        sx={{
                            mb: 2,
                            background:
                                "linear-gradient(135deg, #E8651A 0%, #2E7D32 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Về ReFood
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ maxWidth: 650, mx: "auto", fontWeight: 400 }}
                    >
                        Kết nối yêu thương — Mang bữa ăn ấm lòng đến với những
                        người lao động ban đêm và hoàn cảnh khó khăn
                    </Typography>
                </AnimatedSection>
            </SectionLayout>

            {/* Câu chuyện */}
            <SectionLayout>
                <AnimatedSection variant="fadeUp">
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography
                                variant="h3"
                                fontWeight={700}
                                sx={{ mb: 3 }}
                            >
                                Câu Chuyện Của ReFood
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ lineHeight: 1.9, mb: 2 }}
                            >
                                ReFood ra đời từ một câu hỏi đơn giản: &ldquo;Ai sẽ phục
                                vụ bữa ăn cho những người lao động ca đêm?&rdquo; Khi
                                thành phố chìm vào giấc ngủ, hàng nghìn công
                                nhân, bảo vệ, tài xế vẫn đang miệt mài làm việc.
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ lineHeight: 1.9 }}
                            >
                                Chúng tôi xây dựng ReFood như một cầu nối — giữa
                                những quán ăn ngon, những tấm lòng thiện nguyện,
                                và những người đang cần một bữa ăn nóng hổi giữa
                                đêm khuya. Từng tô phở, từng suất cơm đều mang
                                theo tình yêu thương và sự sẻ chia.
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    fontSize: 180,
                                    textAlign: "center",
                                    lineHeight: 1,
                                    filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.1))",
                                }}
                            >
                                🍜
                            </Box>
                        </Grid>
                    </Grid>
                </AnimatedSection>
            </SectionLayout>

            {/* Giá trị cốt lõi */}
            <SectionLayout
                bgcolor={(theme) =>
                    theme.palette.mode === "light"
                        ? "rgba(232,101,26,0.03)"
                        : "rgba(232,101,26,0.06)"
                }
            >
                <AnimatedSection variant="fadeUp">
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        textAlign="center"
                        sx={{ mb: 5 }}
                    >
                        Giá Trị Cốt Lõi
                    </Typography>
                </AnimatedSection>
                <Grid container spacing={3}>
                    {values.map((item, idx) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                            <AnimatedSection
                                variant="fadeUp"
                                delay={idx * 0.1}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        textAlign: "center",
                                        transition: "transform 0.3s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 3 }}>
                                        <Stack
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Box sx={{ color: item.color }}>
                                                {item.icon}
                                            </Box>
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                            >
                                                {item.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {item.desc}
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        </Grid>
                    ))}
                </Grid>
            </SectionLayout>

            {/* Đội ngũ */}
            <SectionLayout>
                <AnimatedSection variant="fadeUp">
                    <Typography
                        variant="h3"
                        fontWeight={700}
                        textAlign="center"
                        sx={{ mb: 5 }}
                    >
                        Đội Ngũ
                    </Typography>
                </AnimatedSection>
                <Grid container spacing={3} justifyContent="center">
                    {teamMembers.map((member, idx) => (
                        <Grid size={{ xs: 12, sm: 4 }} key={idx}>
                            <AnimatedSection
                                variant="scale"
                                delay={idx * 0.1}
                            >
                                <Card
                                    sx={{
                                        textAlign: "center",
                                        p: 3,
                                    }}
                                >
                                    <Stack spacing={2} alignItems="center">
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                fontSize: 40,
                                                bgcolor:
                                                    "rgba(232,101,26,0.1)",
                                            }}
                                        >
                                            {member.avatar}
                                        </Avatar>
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                            >
                                                {member.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                {member.role}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Card>
                            </AnimatedSection>
                        </Grid>
                    ))}
                </Grid>
            </SectionLayout>

            {/* Footer message */}
            <SectionLayout
                sx={{
                    py: 6,
                    textAlign: "center",
                    background: (theme) =>
                        theme.palette.mode === "light"
                            ? "linear-gradient(135deg, #E8F5E9 0%, #FFF8E1 100%)"
                            : "linear-gradient(135deg, #0a1f0d 0%, #1a1205 100%)",
                }}
            >
                <AnimatedSection variant="scale">
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                        ❤️ Mỗi bữa ăn là một lời yêu thương
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ maxWidth: 500, mx: "auto" }}
                    >
                        Cảm ơn bạn đã đồng hành cùng ReFood trên hành trình kết
                        nối cộng đồng.
                    </Typography>
                </AnimatedSection>
            </SectionLayout>
        </Box>
    );
}

export default About;
