/**
 * CartContext.jsx - Context quản lý Giỏ hàng
 *
 * Theo kiến thức React Hooks:
 * - useReducer: Quản lý state phức tạp của giỏ hàng (items, add, remove, update)
 *   Sử dụng action types và reducer function để xử lý logic
 * - useContext: Chia sẻ cart state giữa các component
 * - useCallback: Ghi nhớ các callback functions (addItem, removeItem, etc.)
 * - useMemo: Tính toán các giá trị derived (totalItems, totalPrice)
 *   chỉ khi dependencies thay đổi
 * - useState: Quản lý UI state đơn giản (snackbar)
 */

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    useState,
} from "react";

// Tạo Context
const CartContext = createContext(null);

// Initial state
const initialState = {
    items: [],
};

// Action types
const CART_ACTIONS = {
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    UPDATE_QUANTITY: "UPDATE_QUANTITY",
    CLEAR_CART: "CLEAR_CART",
};

/**
 * Cart Reducer - Xử lý các action để cập nhật state giỏ hàng
 *
 * Theo pattern useReducer:
 * - Nhận state hiện tại và action
 * - Trả về state mới (immutable)
 * - Switch case theo action.type
 */
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            // Kiểm tra item đã tồn tại trong giỏ chưa
            const existingIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingIndex >= 0) {
                // Nếu đã có, tăng quantity
                const newItems = [...state.items];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + 1,
                };
                return { ...state, items: newItems };
            }

            // Nếu chưa có, thêm mới với quantity = 1
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }

        case CART_ACTIONS.REMOVE_ITEM:
            // Lọc bỏ item theo id
            return {
                ...state,
                items: state.items.filter(
                    (item) => item._id !== action.payload
                ),
            };

        case CART_ACTIONS.UPDATE_QUANTITY: {
            // Nếu quantity <= 0, xóa item
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item._id !== action.payload._id
                    ),
                };
            }
            // Cập nhật quantity
            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return { ...state, items: [] };

        default:
            return state;
    }
}

/**
 * CartProvider Component
 * Kết hợp useReducer và useState để quản lý state
 */
export function CartProvider({ children }) {
    // useReducer cho cart state phức tạp
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // useState cho UI state đơn giản (snackbar notification)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
    });

    // useCallback để ghi nhớ showSnackbar function
    const showSnackbar = useCallback((message) => {
        setSnackbar({ open: true, message });
    }, []);

    // useCallback để ghi nhớ closeSnackbar function
    const closeSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    // Các action creators với useCallback
    const addItem = useCallback(
        (item) => {
            dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: item });
            showSnackbar(`Đã thêm "${item.name}" vào giỏ hàng!`);
        },
        [showSnackbar]
    );

    const removeItem = useCallback((id) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: id });
    }, []);

    const updateQuantity = useCallback((_id, quantity) => {
        dispatch({
            type: CART_ACTIONS.UPDATE_QUANTITY,
            payload: { _id, quantity },
        });
    }, []);

    const clearCart = useCallback(() => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    }, []);

    /**
     * useMemo cho các giá trị tính toán
     * Chỉ tính lại khi state.items thay đổi
     */
    const totalItems = useMemo(
        () => state.items.reduce((sum, item) => sum + item.quantity, 0),
        [state.items]
    );

    const totalPrice = useMemo(
        () =>
            state.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            ),
        [state.items]
    );

    // useMemo cho context value
    const value = useMemo(
        () => ({
            items: state.items,
            totalItems,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            snackbar,
            closeSnackbar,
        }),
        [
            state.items,
            totalItems,
            totalPrice,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            snackbar,
            closeSnackbar,
        ]
    );

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

/**
 * Custom Hook để sử dụng CartContext
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartContext;
