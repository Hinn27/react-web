import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import SectionLayout from "../components/layout/SectionLayout";
import { apiService } from "../services/api";

const EMPTY_MEAL_FORM = {
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    ingredients: "",
    nutritional_info: {},
    full_description: "",
    origin: "",
    calories: "",
    rating: 4.5,
    reviews: 0,
    tag: "",
    time: "",
};

const MAX_IMAGE_SIZE_MB = 3;
const REQUIRED_FIELDS = [
    "name",
    "description",
    "category",
    "ingredients",
    "price",
    "image",
];

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalMeals: 0,
        totalUsers: 0,
        totalInteractions: 0,
        evaluationMetrics: {},
    });
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [editingMeal, setEditingMeal] = useState(null);
    const [mealForm, setMealForm] = useState(EMPTY_MEAL_FORM);
    const [formErrors, setFormErrors] = useState({});
    const [formTouched, setFormTouched] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [imageFileName, setImageFileName] = useState("");
    const [dragActive, setDragActive] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const mealsData = await apiService.getMeals();
            let adminStatsData = {
                total_users: 0,
                total_interactions: 0,
            };

            try {
                adminStatsData = await apiService.getAdminStats();
            } catch (statsError) {
                console.warn(
                    "Admin stats unavailable, showing fallback values:",
                    statsError
                );
            }

            let evaluationData = {};
            try {
                evaluationData = await apiService.request("/evaluation/");
            } catch (evaluationError) {
                console.warn(
                    "Evaluation metrics unavailable, showing meals only:",
                    evaluationError
                );
            }

            setMeals(mealsData);
            setStats({
                totalMeals: mealsData.length,
                totalUsers: Number(adminStatsData.total_users || 0),
                totalInteractions: Number(
                    adminStatsData.total_interactions || 0
                ),
                evaluationMetrics: evaluationData,
            });
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setMealForm(EMPTY_MEAL_FORM);
        setEditingMeal(null);
        setFormErrors({});
        setFormTouched({});
        setImagePreview("");
        setImageFileName("");
    };

    const handleOpenCreate = () => {
        resetForm();
        setOpenForm(true);
    };

    const handleOpenEdit = (meal) => {
        setEditingMeal(meal);
        setMealForm({
            name: meal.name || "",
            description: meal.description || "",
            price: meal.price || "",
            image: meal.image || "",
            category: meal.category || "",
            ingredients: meal.ingredients || "",
            nutritional_info: meal.nutritional_info || {},
            full_description: meal.full_description || "",
            origin: meal.origin || "",
            calories: meal.calories || "",
            rating: meal.rating ?? 4.5,
            reviews: meal.reviews ?? 0,
            tag: meal.tag || "",
            time: meal.time || "",
        });
        setImagePreview(meal.image || "");
        setImageFileName(meal.image ? "Ảnh hiện tại" : "");
        setFormErrors({});
        setFormTouched({});
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        resetForm();
    };

    const validateField = (field, value) => {
        const trimmed = String(value ?? "").trim();

        if (field === "name" && !trimmed) return "Tên món ăn là bắt buộc";
        if (field === "name" && trimmed.length < 3)
            return "Tên món cần ít nhất 3 ký tự";
        if (field === "description" && !trimmed)
            return "Mô tả ngắn là bắt buộc";
        if (
            field === "description" &&
            trimmed.length > 0 &&
            trimmed.length < 12
        )
            return "Mô tả ngắn cần ít nhất 12 ký tự";
        if (field === "category" && !trimmed) return "Danh mục là bắt buộc";
        if (field === "category" && trimmed.length > 0 && trimmed.length < 2)
            return "Danh mục cần ít nhất 2 ký tự";
        if (field === "ingredients" && !trimmed)
            return "Nguyên liệu là bắt buộc";
        if (field === "ingredients" && trimmed.length > 0 && trimmed.length < 5)
            return "Nguyên liệu cần ít nhất 5 ký tự";
        if (field === "image" && !trimmed) return "Vui lòng chọn ảnh món ăn";

        if (field === "price") {
            if (!trimmed) return "Giá là bắt buộc";
            if (Number(trimmed) <= 0) return "Giá phải lớn hơn 0";
            if (Number(trimmed) > 100000000) return "Giá không hợp lệ";
        }

        if (field === "calories" && trimmed && Number(trimmed) < 0) {
            return "Calories không được âm";
        }

        return "";
    };

    const validateMealForm = (formData) => {
        const fieldsToValidate = [
            "name",
            "description",
            "category",
            "ingredients",
            "price",
            "image",
            "calories",
        ];

        return fieldsToValidate.reduce((acc, field) => {
            const error = validateField(field, formData[field]);
            if (error) acc[field] = error;
            return acc;
        }, {});
    };

    const handleFormChange = (field, value) => {
        setMealForm((prev) => {
            const nextForm = { ...prev, [field]: value };
            if (formTouched[field]) {
                const error = validateField(field, value);
                setFormErrors((prevErrors) => ({
                    ...prevErrors,
                    [field]: error,
                }));
            }
            return nextForm;
        });
    };

    const handleFieldBlur = (field) => {
        setFormTouched((prev) => ({ ...prev, [field]: true }));
        const error = validateField(field, mealForm[field]);
        setFormErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleImageFileChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        processImageFile(file);
        event.target.value = "";
    };

    const processImageFile = (file) => {
        const maxSizeBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;

        if (!file.type.startsWith("image/")) {
            setFormTouched((prev) => ({ ...prev, image: true }));
            setFormErrors((prev) => ({
                ...prev,
                image: "File đã chọn không phải định dạng ảnh",
            }));
            return;
        }

        if (file.size > maxSizeBytes) {
            setFormTouched((prev) => ({ ...prev, image: true }));
            setFormErrors((prev) => ({
                ...prev,
                image: `Ảnh vượt quá ${MAX_IMAGE_SIZE_MB}MB`,
            }));
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const imageData = String(reader.result || "");
            setMealForm((prev) => ({ ...prev, image: imageData }));
            setImagePreview(imageData);
            setImageFileName(file.name);
            setFormTouched((prev) => ({ ...prev, image: true }));
            setFormErrors((prev) => ({ ...prev, image: "" }));
        };
        reader.readAsDataURL(file);
    };

    const handleDropImage = (event) => {
        event.preventDefault();
        setDragActive(false);
        const file = event.dataTransfer?.files?.[0];
        if (!file) return;
        processImageFile(file);
    };

    const clearSelectedImage = () => {
        setMealForm((prev) => ({ ...prev, image: "" }));
        setImagePreview("");
        setImageFileName("");
        setFormTouched((prev) => ({ ...prev, image: true }));
        setFormErrors((prev) => ({
            ...prev,
            image: "Vui lòng chọn ảnh món ăn",
        }));
    };

    const completionPercent = useMemo(() => {
        const completed = REQUIRED_FIELDS.filter((field) => {
            const value = mealForm[field];
            const hasValue = String(value ?? "").trim().length > 0;
            return hasValue && !validateField(field, value);
        }).length;

        return Math.round((completed / REQUIRED_FIELDS.length) * 100);
    }, [mealForm]);

    const handleSubmitMeal = async () => {
        const nextErrors = validateMealForm(mealForm);
        if (Object.keys(nextErrors).length > 0) {
            setFormErrors(nextErrors);
            setFormTouched({
                name: true,
                description: true,
                category: true,
                ingredients: true,
                price: true,
                image: true,
                calories: true,
            });
            setErrorMessage("Vui lòng kiểm tra lại thông tin món ăn.");
            return;
        }

        const payload = {
            ...mealForm,
            price: Number(mealForm.price),
            rating: Number(mealForm.rating || 0),
            reviews: Number(mealForm.reviews || 0),
        };

        try {
            setSubmitting(true);
            setErrorMessage("");
            if (editingMeal) {
                await apiService.updateMeal(editingMeal.id, payload);
                setMessage("Cập nhật món ăn thành công");
            } else {
                await apiService.createMeal(payload);
                setMessage("Tạo món ăn mới thành công");
            }
            handleCloseForm();
            await loadDashboardData();
        } catch (error) {
            setErrorMessage("Không thể lưu món ăn. Vui lòng thử lại.");
            console.error("Save meal failed:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteMeal = async (meal) => {
        const confirmed = window.confirm(
            `Bạn có chắc muốn xóa món \"${meal.name}\"?`
        );
        if (!confirmed) return;

        try {
            setErrorMessage("");
            await apiService.deleteMeal(meal.id);
            setMessage("Xóa món ăn thành công");
            await loadDashboardData();
        } catch (error) {
            setErrorMessage("Không thể xóa món ăn. Vui lòng thử lại.");
            console.error("Delete meal failed:", error);
        }
    };

    const managedMeals = useMemo(() => {
        const filtered = [...meals].filter((meal) => {
            const keyword = searchKeyword.trim().toLowerCase();
            const matchKeyword =
                !keyword ||
                meal.name?.toLowerCase().includes(keyword) ||
                meal.category?.toLowerCase().includes(keyword);
            const matchCategory =
                !categoryFilter.trim() || meal.category === categoryFilter;
            return matchKeyword && matchCategory;
        });

        const sorted = filtered.sort((a, b) => {
            const direction = sortOrder === "asc" ? 1 : -1;

            if (sortBy === "name" || sortBy === "category") {
                const aValue = String(a[sortBy] || "").toLowerCase();
                const bValue = String(b[sortBy] || "").toLowerCase();
                return aValue.localeCompare(bValue) * direction;
            }

            if (sortBy === "price") {
                return (Number(a.price) - Number(b.price)) * direction;
            }

            return (
                (Number(a[sortBy] || 0) - Number(b[sortBy] || 0)) * direction
            );
        });

        return sorted;
    }, [meals, searchKeyword, categoryFilter, sortBy, sortOrder]);

    const pagedMeals = useMemo(() => {
        const start = page * rowsPerPage;
        return managedMeals.slice(start, start + rowsPerPage);
    }, [managedMeals, page, rowsPerPage]);

    const categoryOptions = [
        ...new Set(meals.map((meal) => meal.category).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));

    useEffect(() => {
        setPage(0);
    }, [searchKeyword, categoryFilter, rowsPerPage]);

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            return;
        }
        setSortBy(column);
        setSortOrder("asc");
    };

    const renderSortLabel = (column, label, align = "left") => (
        <TableCell align={align}>
            <TableSortLabel
                active={sortBy === column}
                direction={sortBy === column ? sortOrder : "asc"}
                onClick={() => handleSort(column)}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );

    if (loading) {
        return (
            <SectionLayout variant="narrow">
                <Typography>Đang tải dữ liệu...</Typography>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout variant="wide" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Thống Kê & Phân Tích
            </Typography>

            {message && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                    onClose={() => setMessage("")}
                >
                    {message}
                </Alert>
            )}

            {errorMessage && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    onClose={() => setErrorMessage("")}
                >
                    {errorMessage}
                </Alert>
            )}

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Tổng Số Món Ăn
                            </Typography>
                            <Typography variant="h4">
                                {stats.totalMeals}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Tổng Người Dùng
                            </Typography>
                            <Typography variant="h4">
                                {stats.totalUsers}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Tổng Tương Tác
                            </Typography>
                            <Typography variant="h4">
                                {stats.totalInteractions}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                RMSE (Đánh Giá)
                            </Typography>
                            <Typography variant="h4">
                                {stats.evaluationMetrics.rmse?.toFixed(2) ||
                                    "N/A"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Top Meals Table */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Món Ăn Phổ Biến Nhất
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tên Món</TableCell>
                                    <TableCell align="right">
                                        Lượt Xem
                                    </TableCell>
                                    <TableCell align="right">
                                        Lượt Mua
                                    </TableCell>
                                    <TableCell align="right">
                                        Tổng Tương Tác
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {meals
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            b.view_count +
                                            b.purchase_count -
                                            (a.view_count + a.purchase_count)
                                    )
                                    .slice(0, 5)
                                    .map((meal) => (
                                        <TableRow key={meal.id}>
                                            <TableCell>{meal.name}</TableCell>
                                            <TableCell align="right">
                                                {meal.view_count}
                                            </TableCell>
                                            <TableCell align="right">
                                                {meal.purchase_count}
                                            </TableCell>
                                            <TableCell align="right">
                                                {meal.view_count +
                                                    meal.purchase_count}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {meals.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            Chưa có dữ liệu món ăn
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

            {/* Product Management CRUD */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                        <Typography variant="h6">Quản Lí Sản Phẩm</Typography>
                        <Button variant="contained" onClick={handleOpenCreate}>
                            Thêm Món Ăn
                        </Button>
                    </Stack>

                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        sx={{ mb: 2 }}
                    >
                        <TextField
                            label="Tìm theo tên hoặc danh mục"
                            fullWidth
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <TextField
                            select
                            label="Lọc danh mục"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            sx={{ minWidth: { md: 220 } }}
                        >
                            <MenuItem value="">Tất cả</MenuItem>
                            {categoryOptions.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    {renderSortLabel("name", "Tên món")}
                                    {renderSortLabel("category", "Danh mục")}
                                    {renderSortLabel("price", "Giá", "right")}
                                    {renderSortLabel(
                                        "view_count",
                                        "Lượt xem",
                                        "right"
                                    )}
                                    {renderSortLabel(
                                        "purchase_count",
                                        "Lượt mua",
                                        "right"
                                    )}
                                    <TableCell align="right">
                                        Thao tác
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {pagedMeals.map((meal, index) => (
                                    <TableRow key={meal.id}>
                                        <TableCell>
                                            {page * rowsPerPage + index + 1}
                                        </TableCell>
                                        <TableCell>{meal.name}</TableCell>
                                        <TableCell>{meal.category}</TableCell>
                                        <TableCell align="right">
                                            {Number(meal.price).toLocaleString(
                                                "vi-VN"
                                            )}
                                        </TableCell>
                                        <TableCell align="right">
                                            {meal.view_count}
                                        </TableCell>
                                        <TableCell align="right">
                                            {meal.purchase_count}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Stack
                                                direction="row"
                                                spacing={1}
                                                justifyContent="flex-end"
                                            >
                                                <Button
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleOpenEdit(meal)
                                                    }
                                                >
                                                    Sửa
                                                </Button>
                                                <Button
                                                    size="small"
                                                    color="error"
                                                    variant="outlined"
                                                    onClick={() =>
                                                        handleDeleteMeal(meal)
                                                    }
                                                >
                                                    Xóa
                                                </Button>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {managedMeals.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            Không có sản phẩm phù hợp bộ lọc
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={managedMeals.length}
                        page={page}
                        onPageChange={(_, nextPage) => setPage(nextPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(Number(event.target.value));
                            setPage(0);
                        }}
                        rowsPerPageOptions={[5, 10, 20]}
                        labelRowsPerPage="Số dòng mỗi trang"
                    />
                </CardContent>
            </Card>

            {/* Evaluation Metrics */}
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Chỉ Số Đánh Giá Hệ Thống Gợi Ý
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">
                                <strong>RMSE:</strong>{" "}
                                {stats.evaluationMetrics.rmse?.toFixed(3) ||
                                    "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">
                                <strong>Precision:</strong>{" "}
                                {stats.evaluationMetrics.precision?.toFixed(
                                    3
                                ) || "N/A"}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography variant="body1">
                                <strong>Recall:</strong>{" "}
                                {stats.evaluationMetrics.recall?.toFixed(3) ||
                                    "N/A"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Dialog
                open={openForm}
                onClose={handleCloseForm}
                fullWidth
                maxWidth="md"
            >
                <DialogTitle
                    sx={{
                        pb: 1,
                        background:
                            "linear-gradient(135deg, rgba(232,101,26,0.08) 0%, rgba(46,125,50,0.08) 100%)",
                    }}
                >
                    <Typography variant="h6" fontWeight={700}>
                        {editingMeal ? "Cập Nhật Món Ăn" : "Thêm Món Ăn Mới"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Điền thông tin đầy đủ để sản phẩm hiển thị đẹp trên
                        trang menu và chi tiết món ăn.
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 2.5 }}>
                    <Stack spacing={2.5} sx={{ mt: 0.5 }}>
                        <Box
                            sx={{
                                px: 1.5,
                                py: 1,
                                borderRadius: 1.5,
                                bgcolor:
                                    completionPercent === 100
                                        ? "success.50"
                                        : "grey.100",
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ mb: 0.75 }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Tiến độ hoàn thiện biểu mẫu
                                </Typography>
                                <Typography variant="caption" fontWeight={700}>
                                    {completionPercent}%
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    height: 8,
                                    borderRadius: 999,
                                    bgcolor: "grey.300",
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: `${completionPercent}%`,
                                        height: "100%",
                                        transition: "width 240ms ease",
                                        bgcolor:
                                            completionPercent === 100
                                                ? "success.main"
                                                : "primary.main",
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                Thông tin cơ bản
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={8}>
                                    <TextField
                                        label="Tên món"
                                        fullWidth
                                        required
                                        value={mealForm.name}
                                        error={Boolean(
                                            formTouched.name && formErrors.name
                                        )}
                                        helperText={
                                            formTouched.name
                                                ? formErrors.name
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() => handleFieldBlur("name")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        label="Danh mục"
                                        fullWidth
                                        required
                                        value={mealForm.category}
                                        error={Boolean(
                                            formTouched.category &&
                                            formErrors.category
                                        )}
                                        helperText={
                                            formTouched.category
                                                ? formErrors.category
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "category",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handleFieldBlur("category")
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Giá"
                                        type="number"
                                        fullWidth
                                        required
                                        inputProps={{ min: 0 }}
                                        value={mealForm.price}
                                        error={Boolean(
                                            formTouched.price &&
                                            formErrors.price
                                        )}
                                        helperText={
                                            formTouched.price
                                                ? formErrors.price
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "price",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() => handleFieldBlur("price")}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        label="Thời gian chuẩn bị"
                                        fullWidth
                                        placeholder="VD: 15 phút"
                                        value={mealForm.time}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "time",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <Box
                                            onDragEnter={(event) => {
                                                event.preventDefault();
                                                setDragActive(true);
                                            }}
                                            onDragOver={(event) => {
                                                event.preventDefault();
                                                if (!dragActive) {
                                                    setDragActive(true);
                                                }
                                            }}
                                            onDragLeave={(event) => {
                                                event.preventDefault();
                                                setDragActive(false);
                                            }}
                                            onDrop={handleDropImage}
                                            sx={{
                                                border: "2px dashed",
                                                borderColor: dragActive
                                                    ? "primary.main"
                                                    : "divider",
                                                borderRadius: 2,
                                                p: 2,
                                                bgcolor: dragActive
                                                    ? "primary.50"
                                                    : "background.paper",
                                                transition:
                                                    "all 180ms ease-in-out",
                                            }}
                                        >
                                            <Stack
                                                direction={{
                                                    xs: "column",
                                                    sm: "row",
                                                }}
                                                spacing={1.25}
                                                alignItems={{
                                                    xs: "flex-start",
                                                    sm: "center",
                                                }}
                                                justifyContent="space-between"
                                            >
                                                <Stack spacing={0.25}>
                                                    <Typography
                                                        fontWeight={600}
                                                    >
                                                        Ảnh món ăn
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        Kéo thả ảnh vào đây hoặc
                                                        bấm để chọn (JPG, PNG,
                                                        WEBP, tối đa{" "}
                                                        {MAX_IMAGE_SIZE_MB}
                                                        MB)
                                                    </Typography>
                                                </Stack>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                    >
                                                        Chọn ảnh
                                                        <input
                                                            hidden
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={
                                                                handleImageFileChange
                                                            }
                                                        />
                                                    </Button>
                                                    {(imagePreview ||
                                                        mealForm.image) && (
                                                        <Button
                                                            variant="text"
                                                            color="error"
                                                            onClick={
                                                                clearSelectedImage
                                                            }
                                                        >
                                                            Xóa ảnh
                                                        </Button>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            color={
                                                formTouched.image &&
                                                formErrors.image
                                                    ? "error.main"
                                                    : "text.secondary"
                                            }
                                        >
                                            {imageFileName
                                                ? `Đã chọn: ${imageFileName}`
                                                : "Chưa chọn ảnh"}
                                        </Typography>
                                        {formTouched.image &&
                                            formErrors.image && (
                                                <Typography
                                                    variant="caption"
                                                    color="error.main"
                                                >
                                                    {formErrors.image}
                                                </Typography>
                                            )}
                                        {(imagePreview || mealForm.image) && (
                                            <Box
                                                component="img"
                                                src={
                                                    imagePreview ||
                                                    mealForm.image
                                                }
                                                alt="Xem trước ảnh món ăn"
                                                sx={{
                                                    width: "100%",
                                                    maxWidth: 320,
                                                    height: 190,
                                                    objectFit: "cover",
                                                    borderRadius: 1.5,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            />
                                        )}
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                Nội dung hiển thị
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mô tả ngắn"
                                        fullWidth
                                        required
                                        multiline
                                        minRows={2}
                                        inputProps={{ maxLength: 200 }}
                                        value={mealForm.description}
                                        error={Boolean(
                                            formTouched.description &&
                                            formErrors.description
                                        )}
                                        helperText={
                                            formTouched.description
                                                ? formErrors.description
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handleFieldBlur("description")
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Mô tả chi tiết"
                                        fullWidth
                                        multiline
                                        minRows={3}
                                        value={mealForm.full_description}
                                        onChange={(e) =>
                                            handleFormChange(
                                                "full_description",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nguyên liệu"
                                        fullWidth
                                        required
                                        multiline
                                        minRows={2}
                                        inputProps={{ maxLength: 300 }}
                                        value={mealForm.ingredients}
                                        error={Boolean(
                                            formTouched.ingredients &&
                                            formErrors.ingredients
                                        )}
                                        helperText={
                                            formTouched.ingredients
                                                ? formErrors.ingredients
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "ingredients",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handleFieldBlur("ingredients")
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Calories"
                                        type="number"
                                        fullWidth
                                        inputProps={{ min: 0 }}
                                        value={mealForm.calories}
                                        error={Boolean(
                                            formTouched.calories &&
                                            formErrors.calories
                                        )}
                                        helperText={
                                            formTouched.calories
                                                ? formErrors.calories
                                                : ""
                                        }
                                        onChange={(e) =>
                                            handleFormChange(
                                                "calories",
                                                e.target.value
                                            )
                                        }
                                        onBlur={() =>
                                            handleFieldBlur("calories")
                                        }
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2.5, pt: 1.5 }}>
                    <Button variant="text" onClick={handleCloseForm}>
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitMeal}
                        disabled={submitting}
                        sx={{ minWidth: 132 }}
                    >
                        {submitting
                            ? "Đang lưu..."
                            : editingMeal
                              ? "Cập nhật"
                              : "Tạo mới"}
                    </Button>
                </DialogActions>
            </Dialog>
        </SectionLayout>
    );
}

export default AdminDashboard;
