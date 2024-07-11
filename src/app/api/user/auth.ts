import { UserLoginForm } from "@/interfaces/userLoginForm";
import { UserRegisterForm } from "@/interfaces/userRegisterForm";
import axios from "axios";

export const registerRequest = async (userForm: UserRegisterForm) => {
  try {
    const res = await axios.post(`/api/auth/register`, userForm);
    console.log(res.status, res.data);
    if (res.status === 400) {
      throw new Error("User already exists");
    }

    if (!res.data) {
      throw new Error("Failed to register user");
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Manejo específico del error 402
      console.error(error.response?.data?.message);
    } else {
      // Manejo de otros errores
      console.error(
        "Error al registrar",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
};

export const loginRequest = async (userForm: UserLoginForm) => {
  try {
    const res = await axios.post(`/api/auth/login`, userForm);
    console.log(res.status, res.data);
    if (res.status === 401) {
      throw new Error("Invalid credentials");
    }

    if (!res.data) {
      throw new Error("Failed to login user");
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Manejo específico del error 401
      console.error(error.response?.data?.message);
    } else {
      // Manejo de otros errores
      console.error(
        "Error al iniciar sesión",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
};

export const logoutRequest = async () => {
  try {
    const res = await axios.post(`/api/auth/logout`);
    console.log(res.status, res.data);

    if (!res.data) {
      throw new Error("Failed to logout user");
    }

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Manejo específico del error 401
      console.error(error.response?.data?.message);
    } else {
      // Manejo de otros errores
      console.error(
        "Error al cerrar sesión",
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
};
