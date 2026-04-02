/**
 * Trang Chính Sách Bảo Mật.
 * Kiến thức áp dụng:
 * - Functional Component
 * - MUI Typography, Card layout
 */

import SecurityIcon from "@mui/icons-material/Security";
import {
    Box,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import AnimatedSection from "../components/common/AnimatedSection";
import SectionLayout from "../components/layout/SectionLayout";

const sections = [
    {
        title: "1. Thông tin chúng tôi thu thập",
        content:
            "Khi bạn sử dụng ReFood, chúng tôi có thể thu thập các thông tin cá nhân như: họ tên, email, số điện thoại, địa chỉ giao hàng. Các thông tin này chỉ được sử dụng để xử lý đơn hàng và cải thiện dịch vụ.",
    },
    {
        title: "2. Cách chúng tôi sử dụng thông tin",
        content:
            "Thông tin của bạn được sử dụng để: xử lý và giao đơn hàng, liên hệ hỗ trợ khách hàng, cải thiện sản phẩm và dịch vụ, gửi thông báo về chương trình thiện nguyện (nếu bạn đồng ý).",
    },
    {
        title: "3. Bảo mật thông tin",
        content:
            "ReFood cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để ngăn chặn việc truy cập trái phép, mất mát hoặc lạm dụng dữ liệu.",
    },
    {
        title: "4. Chia sẻ thông tin",
        content:
            "Chúng tôi không bán, trao đổi hoặc chia sẻ thông tin cá nhân của bạn cho bên thứ ba, trừ khi cần thiết để thực hiện dịch vụ (ví dụ: đối tác giao hàng) hoặc theo yêu cầu pháp luật.",
    },
    {
        title: "5. Quyền của bạn",
        content:
            "Bạn có quyền: truy cập, chỉnh sửa hoặc xóa thông tin cá nhân; từ chối nhận thông báo marketing; yêu cầu xuất dữ liệu cá nhân. Liên hệ contact@refood.org để thực hiện các quyền này.",
    },
    {
        title: "6. Liên hệ",
        content:
            "Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên hệ: Email: contact@refood.org | Hotline: 1900 1009 (Miễn phí) | Địa chỉ: Trường Đại học Đông Á, Đà Nẵng.",
    },
];

function Privacy() {
    return (
        <SectionLayout
            variant="narrow"
            sx={{ py: { xs: 6, md: 8 } }}
            bgcolor="background.default"
        >
            {/* Header */}
            <AnimatedSection variant="fadeUp">
                <Stack alignItems="center" spacing={2} sx={{ mb: 5 }}>
                    <SecurityIcon
                        sx={{ fontSize: 56, color: "secondary.main" }}
                    />
                    <Typography variant="h2" fontWeight={800} textAlign="center">
                        Chính Sách Bảo Mật
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        textAlign="center"
                        sx={{ maxWidth: 600 }}
                    >
                        ReFood cam kết bảo vệ quyền riêng tư và thông tin cá
                        nhân của bạn. Chính sách này giải thích cách chúng tôi
                        thu thập, sử dụng và bảo mật dữ liệu.
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Cập nhật lần cuối: Tháng 4, 2026
                    </Typography>
                </Stack>
            </AnimatedSection>

            {/* Sections */}
            <Stack spacing={3}>
                {sections.map((section, idx) => (
                    <AnimatedSection
                        key={idx}
                        variant="fadeUp"
                        delay={idx * 0.08}
                    >
                        <Card>
                            <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ mb: 1.5, color: "primary.main" }}
                                >
                                    {section.title}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ lineHeight: 1.8 }}
                                >
                                    {section.content}
                                </Typography>
                            </CardContent>
                        </Card>
                    </AnimatedSection>
                ))}
            </Stack>

            {/* Bottom note */}
            <AnimatedSection variant="fadeUp" delay={0.5}>
                <Divider sx={{ my: 4 }} />
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                        Bằng việc sử dụng ReFood, bạn đồng ý với các điều khoản
                        trong chính sách bảo mật này.
                    </Typography>
                </Box>
            </AnimatedSection>
        </SectionLayout>
    );
}

export default Privacy;
