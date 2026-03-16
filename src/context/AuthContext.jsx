/**
 * Auth context.
 * Kien thuc ap dung:
 * - useReducer cho state auth
 * - useContext de chia se state toan app
 * - useCallback/useMemo de toi uu re-render
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

// Lay state ban dau tu localStorage.
const getInitialState = () => {
    const saved = localStorage.getItem("refood-user");
    return {
        user: saved ? JSON.parse(saved) : null,
        isAuthenticated: !!saved,
    };
};

/** Reducer xu ly cac action auth. */
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

/** Provider chia se auth state/actions. */
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

/** Hook truy cap auth context an toan. */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;
