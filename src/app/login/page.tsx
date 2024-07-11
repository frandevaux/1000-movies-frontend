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
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
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
      <Cartelera title="Ingresar" />
      <div className="flex flex-col items-center mt-5  gap-3">
        <AppButton onPress={() => {}} width="w-[80vw]">
          Continuar con Google
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

        <AppButton onPress={handleLogin} width="w-[80vw]">
          Continuar con correo electronico
        </AppButton>
        <AppButton
          onPress={() => {
            router.push("/register");
          }}
          width="w-[80vw]"
        >
          Registrarse
        </AppButton>
        <AppButton
          onPress={() => {
            router.push("/movies");
          }}
          width="w-[80vw]"
        >
          Continuar como invitado
        </AppButton>
      </div>
    </main>
  );
};

export default LoginPage;
