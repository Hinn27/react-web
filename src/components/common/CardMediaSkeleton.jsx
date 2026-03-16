/**
 * CardMediaSkeleton.jsx - Component hiển thị skeleton khi loading ảnh
 *
 * Theo kiến thức React Hooks:
 * - useState: Quản lý state loaded để biết ảnh đã load xong chưa
 */

import { CardMedia, Skeleton } from "@mui/material";
import { useState } from "react";

/**
 * CardMediaSkeleton Component
 * Hiển thị Skeleton placeholder trong khi ảnh đang load
 */
function CardMediaSkeleton({ sx, ...props }) {
    // useState để track trạng thái load ảnh
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            {/* Skeleton hiển thị khi ảnh chưa load xong */}
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                        aspectRatio: sx?.aspectRatio || "16/10",
                        width: "100%",
                    }}
                />
            )}
            {/* CardMedia - ẩn khi chưa load, hiển thị khi đã load */}
            <CardMedia
                {...props}
                sx={{
                    ...sx,
                    display: loaded ? "block" : "none",
                }}
                onLoad={() => setLoaded(true)}
            />
        </>
    );
}

export default CardMediaSkeleton;
