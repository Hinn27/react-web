/**
 * useDebounce.js - Custom Hook cho debounce
 * - Custom Hook là các hàm tự định nghĩa, bắt đầu bằng từ khóa "use"
 * - Giúp trích xuất và gom nhóm logic dùng chung
 * - Có thể sử dụng các React Hooks khác bên trong
 *
 * useDebounce dùng để delay việc cập nhật value
 * Thường dùng cho search input để tránh gọi API quá nhiều
 */

import { useEffect, useState } from "react";

/**
 * Custom Hook useDebounce
 * @param {any} value - Giá trị cần debounce
 * @param {number} delay - Thời gian delay (ms)
 * @returns {any} - Giá trị đã được debounce
 */
export function useDebounce(value, delay = 500) {
    // useState để lưu giá trị debounced
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Tạo timeout để cập nhật giá trị sau delay
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function - clear timeout khi value hoặc delay thay đổi
        // Điều này ngăn việc cập nhật nếu user còn đang typing
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]); // Dependencies: chạy lại khi value hoặc delay thay đổi

    return debouncedValue;
}

export default useDebounce;
