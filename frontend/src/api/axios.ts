import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "http://127.0.0.1:5001/api",

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "[API REQUEST]",
      config.method?.toUpperCase(),
      config.url,
      token
        ? "JWT attached"
        : "NO JWT"
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(
      "[API RESPONSE]",
      response.status,
      response.config.url
    );

    return response;
  },

  (error) => {
    console.error(
      "[API ERROR]",
      error.response?.status,
      error.config?.url,
      error.response?.data
    );

    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("auth_user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;