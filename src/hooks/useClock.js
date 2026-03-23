/**
 * Hook đồng hồ thời gian thực.
 * Kiến thức áp dụng: `useState`, `useEffect`, cleanup interval.
 */

import { useEffect, useState } from "react";

/**
 * @param {Object} options cấu hình đồng hồ
 * @returns {Object} dữ liệu thời gian hiện tại
 */
export function useClock(options = {}) {
    const { updateInterval = 1000 } = options;

    // Lưu thời gian hiện tại.
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Cập nhật thời gian theo chu kỳ.
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, updateInterval);

        // Dọn interval khi unmount.
        return () => {
            clearInterval(intervalId);
        };
    }, [updateInterval]);

    // Trả về dữ liệu tiện dùng cho UI.
    return {
        time,
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
        formattedTime: time.toLocaleTimeString("vi-VN"),
        formattedDate: time.toLocaleDateString("vi-VN"),
        isNightTime: time.getHours() >= 18 || time.getHours() < 6,
    };
}

export default useClock;
