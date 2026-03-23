/**
 * Hook đồng bộ state với localStorage.
 * Kiến thức áp dụng: `useState`, `useCallback`.
 */

import { useCallback, useState } from "react";

/**
 * @param {string} key khóa localStorage
 * @param {any} initialValue giá trị mặc định
 * @returns {[any, Function, Function]} [value, setValue, removeValue]
 */
export function useLocalStorage(key, initialValue) {
    // Đọc localStorage một lần lúc khởi tạo.
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Cập nhật state và localStorage.
    const setValue = useCallback((value) => {
        try {
            // Hỗ trợ truyền hàm giống setState.
            const valueToStore = value instanceof Function
                ? value(storedValue)
                : value;

            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue]);

    // Xóa giá trị đã lưu.
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
