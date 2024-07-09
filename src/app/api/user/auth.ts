import { UserForm } from "@/interfaces/userFormInteface";
import { User } from "@/interfaces/userInteface";
import axios from "axios";

export const registerRequest = async (userForm: UserForm) => {
  const backend_url = await fetch("/api/env").then((res) => res.text());

  try {
    const res = await axios.post(`${backend_url}/api/register`, userForm);
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

export const loginRequest = async (userForm: UserForm) => {
  const backend_url = await fetch("/api/env").then((res) => res.text());

  try {
    const res = await axios.post(`${backend_url}/api/login`, userForm);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
