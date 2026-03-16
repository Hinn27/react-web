import { Box } from "@mui/material";

/**
 * SectionLayout — Lớp layout responsive dùng chung cho mọi section/page.
 * Tối ưu cho các màn hình tiêu chuẩn: 1440px và 1920px.
 *
 * Variants:
 *   narrow  — 640px  (form đăng nhập, đăng ký, trang lỗi)
 *   medium  — 960px  (checkout, chi tiết)
 *   default — 1400px (các section chính)
 *   wide    — 1600px (grid nhiều items: menu, gallery)
 *   full    — 100%   (hero, banner toàn màn hình)
 */

const LAYOUT_MAX_WIDTH = {
    narrow: 640,
    medium: 960,
    default: 1400,
    wide: 1600,
    full: "100%",
};

// Padding ngang responsive — rộng dần theo viewport
const RESPONSIVE_PX = { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 };

// Padding dọc mặc định cho section
const DEFAULT_PY = { xs: 6, sm: 8, md: 10 };

function SectionLayout({
    children,
    variant = "default",
    bgcolor,
    sx = {},
    containerSx = {},
    noPadding = false,
    component = "section",
    id,
}) {
    const maxWidth = LAYOUT_MAX_WIDTH[variant] ?? LAYOUT_MAX_WIDTH.default;

    return (
        <Box
            component={component}
            id={id}
            sx={{
                width: "100%",
                py: noPadding ? 0 : DEFAULT_PY,
                bgcolor,
                ...sx,
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth,
                    mx: "auto",
                    px: RESPONSIVE_PX,
                    ...containerSx,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

// Export constants để Navbar / Footer dùng chung
export { LAYOUT_MAX_WIDTH, RESPONSIVE_PX };
export default SectionLayout;
