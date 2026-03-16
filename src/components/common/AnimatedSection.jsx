/**
 * AnimatedSection.jsx - Component wrapper cho hiệu ứng animation
 *
 * Sử dụng framer-motion để tạo hiệu ứng xuất hiện khi scroll
 * Kết hợp với useRef và custom hook useInView
 */

import { Box } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Tạo Motion component từ MUI Box
 */
export const MotionBox = motion.create(Box);

/**
 * Các variants animation
 */
const animationVariants = {
    fadeUp: {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeDown: {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
    },
    fadeRight: {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
    },
    scale: {
        hidden: { opacity: 0, scale: 0.85 },
        visible: { opacity: 1, scale: 1 },
    },
    fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
};

/**
 * AnimatedSection Component
 *
 * Theo kiến thức React Hooks:
 * - useRef: Tham chiếu đến DOM element để kiểm tra visibility
 */
function AnimatedSection({
    children,
    variant = "fadeUp",
    delay = 0,
    duration = 0.6,
    once = true,
    threshold = 0.15,
    sx = {},
    ...rest
}) {
    // useRef để tham chiếu đến element
    const ref = useRef(null);

    // useInView từ framer-motion để kiểm tra element có trong viewport không
    const isInView = useInView(ref, {
        once,
        amount: threshold,
    });

    const variants = animationVariants[variant] ?? animationVariants.fadeUp;

    return (
        <MotionBox
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            sx={sx}
            {...rest}
        >
            {children}
        </MotionBox>
    );
}

/**
 * Stagger container cho danh sách items
 */
export const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
    },
};

export default AnimatedSection;
