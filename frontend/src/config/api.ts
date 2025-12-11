import axios from "axios";
  const API_BASE_URL = import.meta.env.VITE_API_URL;

// adjust path if needed

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send refresh token cookies automatically
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle token expiry
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired & request not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API_BASE_URL}/api/user/refresh`,
          {},
          { withCredentials: true } // send refresh token cookie
        );

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        // update header and retry
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        localStorage.removeItem("token");
        window.location.href = "/login"; // redirect to login page
      }
    }

    return Promise.reject(error);
  }
);

export default api;
