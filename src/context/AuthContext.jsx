/**
 * Context quản lý đăng nhập.
 * Kiến thức áp dụng:
 * - `useReducer` cho state auth
 * - `useContext` để dùng state toàn app
 * - `useCallback`/`useMemo` để tối ưu render
 */

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
} from "react";

const AuthContext = createContext(null);

const AUTH_ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    UPDATE_USER: "UPDATE_USER",
};

// Lấy state ban đầu từ localStorage.
const getInitialState = () => {
    const saved = localStorage.getItem("refood-user");
    return {
        user: saved ? JSON.parse(saved) : null,
        isAuthenticated: !!saved,
    };
};

/** Reducer xử lý các action auth. */
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

/** Provider chia sẻ auth state/actions. */
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, null, getInitialState);

    const login = useCallback((userData) => {
        localStorage.setItem("refood-user", JSON.stringify(userData));
        dispatch({ type: AUTH_ACTIONS.LOGIN, payload: userData });
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("refood-user");
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }, []);

    const updateUser = useCallback(
        (updates) => {
            const newUser = { ...state.user, ...updates };
            localStorage.setItem("refood-user", JSON.stringify(newUser));
            dispatch({ type: AUTH_ACTIONS.UPDATE_USER, payload: updates });
        },
        [state.user]
    );

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

/** Hook truy cập auth context an toàn. */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
