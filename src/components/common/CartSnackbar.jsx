/**
 * CartSnackbar.jsx - Component hiển thị thông báo khi thêm vào giỏ hàng
 *
 * Theo kiến thức React Hooks:
 * - useContext thông qua custom hook useCart để lấy snackbar state
 */

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Snackbar } from "@mui/material";
import { useCart } from "../../context/CartContext";

function CartSnackbar() {
    // Sử dụng useCart (custom hook với useContext bên trong)
    const { snackbar, closeSnackbar } = useCart();

    return (
        <Snackbar
            open={snackbar.open}
            autoHideDuration={2500}
            onClose={closeSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Alert
                onClose={closeSnackbar}
                severity="success"
                variant="filled"
                icon={<AddShoppingCartIcon />}
                action={
                    <IconButton
                        size="small"
                        color="inherit"
                        onClick={closeSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
                sx={{
                    background:
                        "linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)",
                    fontWeight: 600,
                }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}

export default CartSnackbar;
