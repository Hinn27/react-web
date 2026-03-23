/**
 * Context quản lý giỏ hàng.
 * Kiến thức áp dụng:
 * - `useReducer` cho logic giỏ hàng
 * - `useContext` để dùng cart ở mọi page
 * - `useMemo`/`useCallback` để tối ưu
 */

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    useState,
} from "react";

const CartContext = createContext(null);

const initialState = {
    items: [],
};

const CART_ACTIONS = {
    ADD_ITEM: "ADD_ITEM",
    REMOVE_ITEM: "REMOVE_ITEM",
    UPDATE_QUANTITY: "UPDATE_QUANTITY",
    CLEAR_CART: "CLEAR_CART",
};

/** Reducer xử lý các action giỏ hàng. */
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const quantityToAdd = action.payload.quantity ?? 1;
            const existingIndex = state.items.findIndex(
                (item) => item._id === action.payload._id
            );

            if (existingIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: newItems[existingIndex].quantity + quantityToAdd,
                };
                return { ...state, items: newItems };
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    { ...action.payload, quantity: quantityToAdd },
                ],
            };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            const itemToRemove = state.items.find(
                (item) => item._id === action.payload._id
            );

            if (!itemToRemove) {
                return state;
            }

            const quantityToRemove = action.payload.quantity ?? 1;

            if (itemToRemove.quantity <= quantityToRemove) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item._id !== action.payload._id
                    ),
                };
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item._id === action.payload._id
                        ? {
                              ...item,
                              quantity: item.quantity - quantityToRemove,
                          }
                        : item
                ),
            };
        }

        case CART_ACTIONS.UPDATE_QUANTITY: {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => item._id !== action.payload._id
                    ),
                };
            }
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

/** Provider chia sẻ cart state/actions. */
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
    });

    const showSnackbar = useCallback((message) => {
        setSnackbar({ open: true, message });
    }, []);

    const closeSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    const addItem = useCallback(
        (item, quantity = 1) => {
            dispatch({
                type: CART_ACTIONS.ADD_ITEM,
                payload: { ...item, quantity },
            });
            showSnackbar(`Đã thêm ${quantity} "${item.name}" vào giỏ hàng!`);
        },
        [showSnackbar]
    );

    const removeItem = useCallback((id, quantity = 1) => {
        dispatch({
            type: CART_ACTIONS.REMOVE_ITEM,
            payload: { _id: id, quantity },
        });
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

    // Giá trị tính toán từ items.
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

    const value = useMemo(
        () => ({
            cartItems: state.items,
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

/** Hook truy cập cart context an toàn. */
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export default CartContext;
