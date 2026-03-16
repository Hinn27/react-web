/**
 * useForm.js - Custom Hook quản lý Form
 * - Custom Hook bắt đầu bằng "use" (ví dụ: useForm)
 * - Giúp tái sử dụng logic form handling giữa nhiều component
 * - Sử dụng useState, useCallback bên trong
 */

import { useCallback, useState } from "react";

/**
 * Custom Hook useForm
 * @param {Object} initialValues - Giá trị khởi tạo của form
 * @param {Function} validate - Hàm validate (optional)
 * @returns {Object} - Form state và các helper functions
 */
export function useForm(initialValues = {}, validate = null) {
    // useState cho form values
    const [values, setValues] = useState(initialValues);

    // useState cho errors
    const [errors, setErrors] = useState({});

    // useState cho touched fields
    const [touched, setTouched] = useState({});

    // useCallback để ghi nhớ handleChange function
    const handleChange = useCallback((e) => {
        const { name, value, type, checked } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
        // Clear error khi user bắt đầu nhập
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    }, []);

    // useCallback cho handleBlur - đánh dấu field đã được touch
    const handleBlur = useCallback((e) => {
        const { name } = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true,
        }));
    }, []);

    // useCallback cho setValue - set giá trị cho một field cụ thể
    const setValue = useCallback((name, value) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    // useCallback cho setError - set error cho một field
    const setError = useCallback((name, error) => {
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    }, []);

    // useCallback cho reset form
    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    // useCallback cho validate form
    const validateForm = useCallback(() => {
        if (!validate) return true;

        const validationErrors = validate(values);
        setErrors(validationErrors);

        return Object.keys(validationErrors).length === 0;
    }, [values, validate]);

    // useCallback cho handleSubmit
    const handleSubmit = useCallback((onSubmit) => (e) => {
        e.preventDefault();

        // Đánh dấu tất cả fields đã touched
        const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);

        // Validate và submit nếu valid
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
        // Helper để check if field has error và đã touched
        hasError: (name) => touched[name] && errors[name],
    };
}

export default useForm;
