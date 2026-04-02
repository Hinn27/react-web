import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { apiService } from "../../services/api";
import { formatPrice } from "../../utils/formatters";

function SimilarMeals({ mealId }) {
    const [similarMeals, setSimilarMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSimilarMeals = async () => {
            if (!mealId) {
                setSimilarMeals([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const similar = await apiService.getSimilarMeals(mealId);
                setSimilarMeals(similar);
            } catch (error) {
                console.error("Failed to load similar meals:", error);
                setSimilarMeals([]);
            } finally {
                setLoading(false);
            }
        };

        loadSimilarMeals();
    }, [mealId]);

    const handleMealClick = async (id) => {
        window.scrollTo(0, 0);
        try {
            await apiService.logInteraction(id, "view");
        } catch (error) {
            console.error("Failed to log interaction:", error);
        }
    };

    if (loading) {
        return <Typography>Loading similar meals...</Typography>;
    }

    if (similarMeals.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom>
                Món Tương Tự
            </Typography>
            <Grid container spacing={2}>
                {similarMeals.map((meal) => (
                    <Grid item xs={12} sm={6} md={4} key={meal.id}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100%",
                                transition:
                                    "transform 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 4,
                                },
                            }}
                        >
                            <CardActionArea
                                component={RouterLink}
                                to={`/product/${meal.id}`}
                                onClick={() => handleMealClick(meal.id)}
                                sx={{
                                    height: "100%",
                                    alignItems: "stretch",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={meal.image || "/placeholder.jpg"}
                                    alt={meal.name}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography
                                        variant="h6"
                                        component="div"
                                        sx={{ fontWeight: 700, mb: 0.5 }}
                                    >
                                        {meal.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mb: 1 }}
                                    >
                                        {meal.description}
                                    </Typography>
                                    <Typography variant="h6" color="primary">
                                        {formatPrice(meal.price)}đ
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default SimilarMeals;
