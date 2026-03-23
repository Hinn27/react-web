/**
 * Hook debounce cho input/search.
 * Kiến thức áp dụng: `useState`, `useEffect`, cleanup timeout.
 */

import { useEffect, useState } from "react";

/**
 * @param {any} value giá trị gốc
 * @param {number} delay thời gian chờ (ms)
 * @returns {any} giá trị sau debounce
 */
export function useDebounce(value, delay = 500) {
    // Lưu giá trị sau debounce.
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Cập nhật sau một khoảng trễ.
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Dọn timeout cũ khi value/delay đổi.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
