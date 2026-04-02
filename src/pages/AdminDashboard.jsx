import {
    Card,
    CardContent,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SectionLayout from "../components/layout/SectionLayout";
import { apiService } from "../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalMeals: 0,
        totalUsers: 0,
        totalInteractions: 0,
        evaluationMetrics: {},
    });
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const [mealsData, evaluationData] = await Promise.all([
                apiService.getMeals(),
                apiService.request("/evaluation/"),
            ]);

            setMeals(mealsData);
            setStats({
                totalMeals: mealsData.length,
                totalUsers: 0, // Would need a separate endpoint
                totalInteractions: 0, // Would need a separate endpoint
                evaluationMetrics: evaluationData,
            });
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

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
                                    .sort(
                                        (a, b) =>
                                            b.view_count +
                                            b.purchase_count -
                                            (a.view_count + a.purchase_count)
                                    )
                                    .slice(0, 10)
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
                            </TableBody>
                        </Table>
                    </TableContainer>
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
        </SectionLayout>
    );
}

export default AdminDashboard;
