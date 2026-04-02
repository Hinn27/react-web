// Utility functions for formatting
export const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) {
        return "0";
    }

    return numericPrice.toLocaleString("vi-VN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).replace(/,/g, ".");
};
