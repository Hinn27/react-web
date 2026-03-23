/**
 * Hook quản lý danh sách món ăn.
 * Kiến thức áp dụng: `useState`, `useMemo`, `useEffect`.
 */

import { useEffect, useMemo, useState } from "react";
import { allMeals } from "../data/meals";

/**
 * @param {Object} options tùy chọn lọc
 * @returns {Object} dữ liệu và hàm thao tác sản phẩm
 */
export function useProducts(options = {}) {
    const { initialCategory = "Tất cả" } = options;

    // State cho bộ lọc.
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(initialCategory);
    const [loading, setLoading] = useState(false);

    // Lọc sản phẩm theo search + category.
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

    // Hàm tìm sản phẩm theo id.
    const getProductById = useMemo(() => {
        return (id) => allMeals.find((meal) => meal._id === id);
    }, []);

    // Mô phỏng trạng thái loading.
    useEffect(() => {
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
