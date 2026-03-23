/**
 * Hook quản lý form dùng lại cho nhiều màn hình.
 * Kiến thức áp dụng: `useState`, `useCallback`.
 */

import { useCallback, useState } from "react";

/**
 * @param {Object} initialValues giá trị khởi tạo
 * @param {Function|null} validate hàm validate
 * @returns {Object} state và hàm hỗ trợ của form
 */
export function useForm(initialValues = {}, validate = null) {
    // State của form.
    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const [touched, setTouched] = useState({});

    // Đổi giá trị input.
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Xóa lỗi của field đang nhập.
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }, []);

    // Đánh dấu field đã tương tác.
    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    }, []);

    // Set giá trị cho một field.
    const setValue = useCallback((name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // Set lỗi cho một field.
    const setError = useCallback((name, error) => {
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    }, []);

    // Reset toàn bộ form.
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    // Chạy validate form.
    const validateForm = useCallback(() => {
        if (!validate) return true;

        const validationErrors = validate(values);
        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    }, [values, validate]);

    // Wrapper submit chuẩn cho form.
    const handleSubmit = useCallback((onSubmit) => (e) => {
        e.preventDefault();

        // Đánh dấu tất cả field đã touch.
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validate pass thì submit.
        if (validateForm()) {
            onSubmit(values);
        }
    }, [values, validateForm]);

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setValue,
        setError,
        resetForm,
        validateForm,
        handleSubmit,
        // Helper kiểm tra field đang lỗi.
        hasError: (name) => touched[name] && errors[name],
    };
}

export default useForm;
