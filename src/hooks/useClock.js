/**
 * useClock.js - Custom Hook hiển thị đồng hồ realtime
 *
 * Theo kiến thức React Hooks - Custom Hook:
 * - Custom Hook bắt đầu bằng "use" (ví dụ: useClock)
 * - Sử dụng useState và useEffect để tạo đồng hồ
 * - useEffect cleanup để dọn dẹp interval khi unmount
 *   (tránh memory leak - theo lifecycle unmounting)
 */

import { useEffect, useState } from "react";

/**
 * Custom Hook useClock
 * @param {Object} options - Các options cho clock
 * @returns {Object} - Thông tin thời gian hiện tại
 */
export function useClock(options = {}) {
    const { updateInterval = 1000 } = options;

    // useState để lưu thời gian hiện tại
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Tạo interval để cập nhật thời gian mỗi giây
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, updateInterval);

        /**
         * Cleanup function - theo Unmounting lifecycle
         * Clear interval khi component bị gỡ khỏi DOM
         * Tránh memory leak
         */
        return () => {
            clearInterval(intervalId);
        };
    }, [updateInterval]); // Dependency: chạy lại nếu updateInterval thay đổi

    // Trả về các thông tin thời gian hữu ích
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
