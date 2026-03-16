/**
 * useProducts.js - Custom Hook quản lý Products
 *
 * Theo kiến thức React Hooks - Custom Hook:
 * - Custom Hook bắt đầu bằng "use" (ví dụ: useProducts)
 * - Quản lý state và logic liên quan đến products
 * - Kết hợp useState, useEffect, useMemo
 */

import { useEffect, useMemo, useState } from "react";
import { allMeals } from "../data/meals";

/**
 * Custom Hook useProducts
 * @param {Object} options - Các options filter
 * @returns {Object} - Products data và helper functions
 */
export function useProducts(options = {}) {
    const { initialCategory = "Tất cả" } = options;

    // useState cho các filter
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [loading, setLoading] = useState(false);

    // useMemo để filter products - chỉ tính lại khi dependencies thay đổi
    const filteredProducts = useMemo(() => {
        return allMeals.filter((meal) => {
            const matchSearch = meal.name
                .toLowerCase()
                .includes(search.toLowerCase());
            const matchCategory =
                category === "Tất cả" || meal.category === category;
            return matchSearch && matchCategory;
        });
    }, [search, category]);

    // Hàm tìm product theo id
    const getProductById = useMemo(() => {
        return (id) => allMeals.find((meal) => meal._id === id);
    }, []);

    // Effect có thể dùng để fetch data từ API
    useEffect(() => {
        // Simulate loading (có thể thay bằng API call thực tế)
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, category]);

    return {
        products: filteredProducts,
        allProducts: allMeals,
        loading,
        search,
        setSearch,
        category,
        setCategory,
        getProductById,
        totalCount: filteredProducts.length,
    };
}

export default useProducts;
