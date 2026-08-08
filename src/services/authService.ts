import api from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};