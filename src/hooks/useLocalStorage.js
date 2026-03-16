/**
 * useLocalStorage.js - Custom Hook quản lý localStorage
 *
 * Theo kiến thức React Hooks - Custom Hook:
 * - Custom Hook bắt đầu bằng "use"
 * - Trích xuất logic localStorage để tái sử dụng
 * - Kết hợp useState với side effect (localStorage)
 */

import { useCallback, useState } from "react";

/**
 * Custom Hook useLocalStorage
 * @param {string} key - Key trong localStorage
 * @param {any} initialValue - Giá trị mặc định
 * @returns {Array} - [storedValue, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
    // useState với lazy initialization
    // Đọc từ localStorage chỉ một lần khi khởi tạo
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // useCallback để ghi nhớ setValue function
    const setValue = useCallback((value) => {
        try {
            // Cho phép value là function (như setState)
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    // useCallback để ghi nhớ removeValue function
    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
