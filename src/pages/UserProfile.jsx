import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import SectionLayout from "../components/layout/SectionLayout";
import { apiService } from "../services/api";

const CATEGORIES = [
    "Bún/Phở",
    "Bánh mì",
    "Cơm",
    "Món nước",
    "Món khô",
    "Ăn vặt",
    "Đồ uống",
];

const DIETARY_RESTRICTIONS = [
    "Chay",
    "Không gluten",
    "Không lactose",
    "Ít calo",
    "Không hải sản",
];

function UserProfile() {
    const [profile, setProfile] = useState({
        favorite_categories: [],
        dietary_restrictions: [],
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const userProfile = await apiService.getUserProfile();
            setProfile(userProfile);
        } catch (error) {
            console.error("Failed to load profile:", error);
            // Profile doesn't exist yet, use defaults
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await apiService.updateUserProfile(profile);
            alert("Hồ sơ đã được cập nhật!");
        } catch (error) {
            console.error("Failed to save profile:", error);
            alert("Có lỗi xảy ra khi lưu hồ sơ");
        } finally {
            setSaving(false);
        }
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setProfile((prev) => ({
            ...prev,
            favorite_categories:
                typeof value === "string" ? value.split(",") : value,
        }));
    };

    const handleRestrictionChange = (event) => {
        const { value } = event.target;
        setProfile((prev) => ({
            ...prev,
            dietary_restrictions:
                typeof value === "string" ? value.split(",") : value,
        }));
    };

    if (loading) {
        return (
            <SectionLayout variant="narrow">
                <Typography>Đang tải hồ sơ...</Typography>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout variant="narrow" sx={{ py: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Sở Thích Của Bạn
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mb: 4 }}
            >
                Hãy cho chúng tôi biết sở thích của bạn để nhận được những gợi ý
                món ăn phù hợp nhất!
            </Typography>

            <Card sx={{ maxWidth: 600, mx: "auto" }}>
                <CardContent sx={{ p: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Thể Loại Yêu Thích</InputLabel>
                                <Select
                                    multiple
                                    value={profile.favorite_categories}
                                    onChange={handleCategoryChange}
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    size="small"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {CATEGORIES.map((category) => (
                                        <MenuItem
                                            key={category}
                                            value={category}
                                        >
                                            <Checkbox
                                                checked={
                                                    profile.favorite_categories.indexOf(
                                                        category
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText primary={category} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Chế Độ Ăn Kiêng</InputLabel>
                                <Select
                                    multiple
                                    value={profile.dietary_restrictions}
                                    onChange={handleRestrictionChange}
                                    renderValue={(selected) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexWrap: "wrap",
                                                gap: 0.5,
                                            }}
                                        >
                                            {selected.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={value}
                                                    size="small"
                                                    color="secondary"
                                                />
                                            ))}
                                        </Box>
                                    )}
                                >
                                    {DIETARY_RESTRICTIONS.map((restriction) => (
                                        <MenuItem
                                            key={restriction}
                                            value={restriction}
                                        >
                                            <Checkbox
                                                checked={
                                                    profile.dietary_restrictions.indexOf(
                                                        restriction
                                                    ) > -1
                                                }
                                            />
                                            <ListItemText
                                                primary={restriction}
                                            />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? "Đang lưu..." : "Lưu Sở Thích"}
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Box sx={{ mt: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                    Sở thích của bạn sẽ giúp chúng tôi gợi ý những món ăn phù
                    hợp hơn. Bạn có thể thay đổi bất cứ lúc nào.
                </Typography>
            </Box>
        </SectionLayout>
    );
}

export default UserProfile;
