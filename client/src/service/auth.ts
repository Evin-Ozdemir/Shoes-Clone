import type {
  AuthResponse,
  GetMeResponse,
  LoginValues,
  LogoutResponse,
  RefreshResponse,
  RegisterValues,
} from "../types";
import api from "./axios";

// Auth ile alakalı bütün api istekleri burada yapılacak
const authApi = {
  register: (data: RegisterValues) =>
    api.post<AuthResponse>("/auth/register", data),

  login: (data: LoginValues) => api.post<AuthResponse>("/auth/login", data),

  logout: () => api.post<LogoutResponse>("/auth/logout"),

  refreshToken: () => api.post<RefreshResponse>("/auth/refresh"),

  getMe: () => api.get<GetMeResponse>("/auth/me"),
};

export default authApi;
