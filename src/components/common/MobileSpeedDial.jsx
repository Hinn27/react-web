/**
 * MobileSpeedDial.jsx - Speed Dial cho mobile navigation
 *
 * Theo kiến thức React Router Dom:
 * - Sử dụng useNavigate hook để điều hướng programmatically
 *   (chuyển trang khi click vào action button)
 */

import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpeedDialIcon from "@mui/icons-material/Widgets";
import {
    Badge,
    SpeedDial,
    SpeedDialAction,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const actions = [
    { icon: <HomeIcon />, name: "Trang chủ", path: "/" },
    { icon: <RestaurantMenuIcon />, name: "Thực đơn", path: "/menu" },
    { icon: <ShoppingCartIcon />, name: "Giỏ hàng", path: "/cart" },
    {
        icon: <PhoneIcon />,
        name: "Hotline: 1800 0000",
        href: "tel:18000000",
    },
];

function MobileSpeedDial() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    // useNavigate hook - trả về function để điều hướng
    const navigate = useNavigate();

    const { totalItems } = useCart();

    // Chỉ hiển thị trên mobile
    if (!isMobile) return null;

    return (
        <SpeedDial
            ariaLabel="Menu nhanh"
            sx={{
                position: "fixed",
                bottom: 24,
                right: 24,
                zIndex: 1200,
                "& .MuiSpeedDial-fab": {
                    background:
                        "linear-gradient(135deg, #E8651A 0%, #FF8A3D 100%)",
                    "&:hover": {
                        background:
                            "linear-gradient(135deg, #B84D10 0%, #E8651A 100%)",
                    },
                },
            }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={
                        action.path === "/cart" ? (
                            <Badge
                                badgeContent={totalItems}
                                color="primary"
                                max={99}
                            >
                                {action.icon}
                            </Badge>
                        ) : (
                            action.icon
                        )
                    }
                    tooltipTitle={action.name}
                    onClick={() => {
                        if (action.href) {
                            // External link
                            window.location.href = action.href;
                        } else {
                            // Sử dụng navigate để chuyển trang
                            // Thay vì tải lại toàn bộ trang
                            navigate(action.path);
                        }
                    }}
                />
            ))}
        </SpeedDial>
    );
}

export default MobileSpeedDial;
