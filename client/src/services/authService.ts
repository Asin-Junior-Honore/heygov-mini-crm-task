import api from "./api";

export interface AuthPayload {
  email: string;
  password: string;
  username?: string;
}

export const authService = {
  register: (payload: AuthPayload) => api.post("/auth/register", payload),
  login: (payload: AuthPayload) => api.post("/auth/login", payload),
  me: () => api.get("/auth/me"),
};
