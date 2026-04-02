import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Chip,
    Grid,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { apiService } from "../../services/api";
import { formatPrice } from "../../utils/formatters";
import AnimatedSection from "../common/AnimatedSection";
import CardMediaSkeleton from "../common/CardMediaSkeleton";
import SectionLayout from "../layout/SectionLayout";

function RecommendationsSection() {
    const { addItem } = useCart();
    const [popularMeals, setPopularMeals] = useState([]);
    const [personalizedMeals, setPersonalizedMeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecommendations();
    }, []);

    const loadRecommendations = async () => {
        try {
            const [popular, personalized] = await Promise.all([
                apiService.getPopularMeals(),
                apiService.getPersonalizedRecommendations().catch(() => []), // fallback if not logged in
            ]);
            setPopularMeals(popular);
            setPersonalizedMeals(personalized);
        } catch (error) {
            console.error("Failed to load recommendations:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleMealClick = async (mealId) => {
        try {
            await apiService.logInteraction(mealId, "view");
        } catch (error) {
            console.error("Failed to log interaction:", error);
        }
    };

    const handleAddToCart = useCallback(
        async (meal) => {
            addItem({
                _id: meal.id,
                name: meal.name,
                price: meal.price,
                image: meal.image,
            });
            try {
                await apiService.logInteraction(meal.id, "add_to_cart");
            } catch (error) {
                console.error("Failed to log interaction:", error);
            }
        },
        [addItem]
    );

    if (loading) {
        return <Typography>Loading recommendations...</Typography>;
    }

    return (
        <SectionLayout
            variant="wide"
            sx={{ py: { xs: 6, md: 8 } }}
            containerSx={{}}
        >
            {/* Popular Meals */}
            <AnimatedSection variant="fadeUp">
                <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    align="center"
                    sx={{ mb: 1, fontWeight: 800 }}
                >
                    Top 5 Món Ăn Phổ Biến
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 4, maxWidth: 720, mx: "auto" }}
                >
                    Các món Việt được yêu thích nhất, sắp xếp theo lượt bán và
                    lượt xem để bạn chọn nhanh món hợp gu.
                </Typography>
            </AnimatedSection>
            <Grid container spacing={3} sx={{ mb: 8 }}>
                {popularMeals.slice(0, 5).map((meal, index) => (
                    <Grid
                        size={{ xs: 12, sm: 6, md: 4, lg: 2.4, xl: 2.4 }}
                        key={meal.id}
                    >
                        <AnimatedSection
                            variant="fadeUp"
                            delay={0.06 * index}
                            threshold={0.1}
                        >
                            <Card
                                sx={{
                                    height: "100%",
                                    minHeight: 390,
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    position: "relative",
                                    borderRadius: 3,
                                    overflow: "visible",
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                                    transition:
                                        "transform 0.25s ease, box-shadow 0.25s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow:
                                            "0 16px 36px rgba(0,0,0,0.12)",
                                    },
                                }}
                            >
                                <Chip
                                    label={meal.tag || "Món nổi bật"}
                                    size="small"
                                    icon={<LocalFireDepartmentIcon />}
                                    sx={{
                                        position: "absolute",
                                        top: 12,
                                        left: 12,
                                        zIndex: 2,
                                        bgcolor: "primary.main",
                                        color: "#fff",
                                        fontWeight: 600,
                                        "& .MuiChip-icon": {
                                            color: "#fff",
                                        },
                                    }}
                                />
                                <CardActionArea
                                    component={RouterLink}
                                    to={`/product/${meal.id}`}
                                    onClick={() => handleMealClick(meal.id)}
                                >
                                    <Box
                                        sx={{
                                            borderRadius: 3,
                                            overflow: "hidden",
                                        }}
                                    >
                                        <CardMediaSkeleton
                                            component="img"
                                            image={
                                                meal.image || "/placeholder.jpg"
                                            }
                                            alt={meal.name}
                                            sx={{
                                                aspectRatio: "16/10",
                                                objectFit: "cover",
                                                width: "100%",
                                            }}
                                        />
                                    </Box>
                                </CardActionArea>
                                <CardContent
                                    sx={{
                                        flexGrow: 1,
                                        pb: 1.5,
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        component="h3"
                                        fontWeight={700}
                                        sx={{
                                            mb: 0.5,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {meal.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            mb: 1.5,
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {meal.description}
                                    </Typography>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        sx={{ mb: 1 }}
                                    >
                                        <StarIcon
                                            sx={{
                                                fontSize: 16,
                                                color: "#FFB400",
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                        >
                                            {meal.rating}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            • {meal.origin}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={0.3}
                                            alignItems="center"
                                        >
                                            <AccessTimeIcon
                                                sx={{
                                                    fontSize: 13,
                                                    color: "text.secondary",
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                {meal.time}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        sx={{ mt: "auto" }}
                                    >
                                        <Typography
                                            variant="h6"
                                            color="primary"
                                            fontWeight={700}
                                        >
                                            {formatPrice(meal.price)}đ
                                        </Typography>
                                        <Tooltip title="Thêm vào giỏ">
                                            <IconButton
                                                color="primary"
                                                onClick={() =>
                                                    handleAddToCart(meal)
                                                }
                                                sx={{
                                                    bgcolor: "primary.light",
                                                    color: "#fff",
                                                    "&:hover": {
                                                        bgcolor: "primary.main",
                                                    },
                                                }}
                                            >
                                                <AddShoppingCartIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    </Grid>
                ))}
            </Grid>

            {/* Personalized Recommendations */}
            {personalizedMeals.length > 0 && (
                <>
                    <Typography
                        variant="h4"
                        component="h2"
                        gutterBottom
                        align="center"
                        sx={{ mb: 4 }}
                    >
                        Dành Riêng Cho Bạn
                    </Typography>
                    <Grid container spacing={3}>
                        {personalizedMeals.slice(0, 5).map((meal) => (
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4,
                                    lg: 2.4,
                                    xl: 2.4,
                                }}
                                key={meal.id}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        minHeight: 390,
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        position: "relative",
                                        borderRadius: 3,
                                        overflow: "visible",
                                        boxShadow:
                                            "0 10px 30px rgba(0,0,0,0.08)",
                                        transition:
                                            "transform 0.25s ease, box-shadow 0.25s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow:
                                                "0 16px 36px rgba(0,0,0,0.12)",
                                        },
                                    }}
                                >
                                    <Chip
                                        label={meal.tag || "Gợi ý"}
                                        size="small"
                                        icon={<LocalFireDepartmentIcon />}
                                        sx={{
                                            position: "absolute",
                                            top: 12,
                                            left: 12,
                                            zIndex: 2,
                                            bgcolor: "secondary.main",
                                            color: "#fff",
                                            fontWeight: 600,
                                            "& .MuiChip-icon": {
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                    <CardActionArea
                                        component={RouterLink}
                                        to={`/product/${meal.id}`}
                                        onClick={() => handleMealClick(meal.id)}
                                    >
                                        <Box
                                            sx={{
                                                borderRadius: 3,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <CardMediaSkeleton
                                                component="img"
                                                image={
                                                    meal.image ||
                                                    "/placeholder.jpg"
                                                }
                                                alt={meal.name}
                                                sx={{
                                                    aspectRatio: "16/10",
                                                    objectFit: "cover",
                                                    width: "100%",
                                                }}
                                            />
                                        </Box>
                                    </CardActionArea>
                                    <CardContent
                                        sx={{
                                            flexGrow: 1,
                                            pb: 1.5,
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            component="h3"
                                            fontWeight={700}
                                            sx={{
                                                mb: 0.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {meal.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                mb: 1.5,
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                        >
                                            {meal.description}
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1}
                                            alignItems="center"
                                            sx={{ mb: 1 }}
                                        >
                                            <StarIcon
                                                sx={{
                                                    fontSize: 16,
                                                    color: "#FFB400",
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                fontWeight={600}
                                            >
                                                {meal.rating}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                            >
                                                • {meal.origin}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={0.3}
                                                alignItems="center"
                                            >
                                                <AccessTimeIcon
                                                    sx={{
                                                        fontSize: 13,
                                                        color: "text.secondary",
                                                    }}
                                                />
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {meal.time}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            sx={{ mt: "auto" }}
                                        >
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                fontWeight={700}
                                            >
                                                {formatPrice(meal.price)}đ
                                            </Typography>
                                            <Tooltip title="Thêm vào giỏ">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() =>
                                                        handleAddToCart(meal)
                                                    }
                                                    sx={{
                                                        bgcolor:
                                                            "primary.light",
                                                        color: "#fff",
                                                        "&:hover": {
                                                            bgcolor:
                                                                "primary.main",
                                                        },
                                                    }}
                                                >
                                                    <AddShoppingCartIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}
        </SectionLayout>
    );
}

export default RecommendationsSection;
