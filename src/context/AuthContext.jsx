/**
 * AuthContext.jsx - Context quản lý Authentication
 *
 * Theo kiến thức React Hooks:
 * - useContext: Chia sẻ thông tin user/auth giữa các component
 *   mà không cần props drilling
 * - useReducer: Quản lý state phức tạp với reducer pattern
 *   (thay vì dùng nhiều useState)
 * - useMemo: Tối ưu hiệu năng bằng cách ghi nhớ context value
 * - useCallback: Ghi nhớ các callback functions
 */

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";

// Tạo Context
const AuthContext = createContext(null);

// Định nghĩa các action types
const AUTH_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    UPDATE_USER: "UPDATE_USER",
};

// Initial state - lấy từ localStorage nếu có
const getInitialState = () => {
    const saved = localStorage.getItem("refood-user");
    return {
        user: saved ? JSON.parse(saved) : null,
        isAuthenticated: !!saved,
    };
};

/**
 * Reducer function - xử lý các action để cập nhật state
 * Theo pattern useReducer: (state, action) => newState
 */
function authReducer(state, action) {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            };
        case AUTH_ACTIONS.LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };
        case AUTH_ACTIONS.UPDATE_USER:
            return {
                ...state,
                user: { ...state.user, ...action.payload },
            };
        default:
            return state;
    }
}

/**
 * AuthProvider Component
 * Sử dụng useReducer thay vì useState cho state phức tạp
 */
export function AuthProvider({ children }) {
    // useReducer cho quản lý state phức tạp
    const [state, dispatch] = useReducer(authReducer, null, getInitialState);

    // useCallback để ghi nhớ login function
    const login = useCallback((userData) => {
        localStorage.setItem("refood-user", JSON.stringify(userData));
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
    }, []);

    // useCallback để ghi nhớ logout function
    const logout = useCallback(() => {
        localStorage.removeItem("refood-user");
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }, []);

    // useCallback để ghi nhớ updateUser function
    const updateUser = useCallback(
        (updates) => {
            const newUser = { ...state.user, ...updates };
            localStorage.setItem("refood-user", JSON.stringify(newUser));
            dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updates });
        },
        [state.user]
    );

    // useMemo để tối ưu context value
    const value = useMemo(
        () => ({
            user: state.user,
            isAuthenticated: state.isAuthenticated,
            login,
            logout,
            updateUser,
        }),
        [state.user, state.isAuthenticated, login, logout, updateUser]
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

/**
 * Custom Hook để sử dụng AuthContext
 * Throw error nếu sử dụng ngoài AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
