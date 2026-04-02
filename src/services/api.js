const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
    constructor() {
        this.baseURL = API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        // Add auth token if available
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Meals
    async getMeals() {
        return this.request('/meals/');
    }

    async getMeal(id) {
        return this.request(`/meals/${id}/`);
    }

    // Recommendations
    async getPopularMeals() {
        return this.request('/popular/');
    }

    async getPersonalizedRecommendations() {
        return this.request('/personalized/');
    }

    async getSimilarMeals(mealId) {
        return this.request(`/similar/${mealId}/`);
    }

    // User interactions
    async logInteraction(mealId, interactionType, duration = 0) {
        return this.request('/interactions/', {
            method: 'POST',
            body: JSON.stringify({
                meal: mealId,
                interaction_type: interactionType,
                duration: duration,
            }),
        });
    }

    // User profile
    async getUserProfile() {
        return this.request('/profile/');
    }

    async updateUserProfile(profileData) {
        return this.request('/profile/update/', {
            method: 'POST',
            body: JSON.stringify(profileData),
        });
    }

    // Auth (placeholder - implement based on your auth system)
    async login(username, password) {
        // Implement login logic
        return { token: 'fake-token' };
    }

    async register(userData) {
        // Implement register logic
        return { user: userData };
    }
}

export const apiService = new ApiService();
