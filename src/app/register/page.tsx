"use client";
import React, { useEffect, useState } from "react";
import { registerRequest } from "../api/user/auth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { UserRegisterForm } from "@/interfaces/userRegisterForm";
import axios from "axios";
import { Cartelera } from "@/components/cartelera";
import { Button } from "@nextui-org/button";
import { Divider, Input } from "@nextui-org/react";
import { AppButton } from "@/components/appButton";

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(`/api/auth/register`, { name, email, password });
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(
          "Error registering user:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden">
      <Cartelera title="Registro" />
      <div className="flex flex-col items-center mt-5  h-full gap-3">
        <AppButton onPress={() => {}} width="w-[80vw]">
          Registrarse con Google
        </AppButton>
        <Divider />
        <Input
          type="email"
          label="Correo electronico"
          value={email}
          onValueChange={setEmail}
        />

        <Input
          type="password"
          label="Contraseña"
          value={password}
          onValueChange={setPassword}
        />
        <Input
          type="password"
          label="Repetir contraseña"
          value={repeatPassword}
          onValueChange={setRepeatPassword}
        />
        <Input
          type="text"
          label="Nombre"
          value={name}
          onValueChange={setName}
        />
        <AppButton onPress={() => handleRegister()} width="w-[80vw]">
          Registrarse con correo electronico
        </AppButton>
        <AppButton
          onPress={() => {
            router.push("/login");
          }}
          width="w-[80vw]"
        >
          Iniciar sesión
        </AppButton>
      </div>
    </main>
  );
};

export default RegisterPage;
