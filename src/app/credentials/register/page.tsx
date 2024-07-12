"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";
import { Cartelera } from "@/components/cartelera";
import { Button } from "@nextui-org/button";
import { Divider, Input, Link } from "@nextui-org/react";
import { AppButton } from "@/components/appButton";
import { FcGoogle } from "react-icons/fc";
import { bebas } from "../../fonts";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/libs/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { set } from "mongoose";
import Google from "next-auth/providers/google";

type RegisterForm = z.infer<typeof RegisterSchema>;

const RegisterPage = () => {
  const { register, handleSubmit, formState } = useForm<RegisterForm>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();
  const [existingUser, setExistingUser] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    target: string
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleRegister = async ({ name, email, password }: RegisterForm) => {
    setExistingUser(false);
    try {
      console.log("Registering user...");
      await axios.post(`/api/auth/register`, { name, email, password });
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!res?.error) {
        router.push("/movies/list");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setExistingUser(true);
        }
      } else {
        console.error(
          "Error registering user:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }
  };

  const handleGoogleRegister = async () => {
    await signIn("google", { callbackUrl: "/movies/list" });
  };

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    await handleRegister(data);
  };

  return (
    <main className="flex h-[85%] w-screen flex-col items-center text-2xl justify-center gap-10 overflow-hidden">
      <div>
        <div className="flex flex-col text-center gap-5 w-[80vw]">
          <h1 className={`${bebas.className} text-6xl`}>Registrarse</h1>
          <p className="text-lg font-medium">
            Regístrate con tu correo electrónico o con Google
          </p>
        </div>
        <div className="flex flex-col items-center mt-5 gap-10">
          <form
            className="flex flex-col items-center gap-3 w-[80vw]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("email")}
              id="email"
              label="Correo electrónico"
              variant="bordered"
              isInvalid={!!formState.errors?.email || existingUser}
              errorMessage={
                existingUser
                  ? "Ya existe un usuario con ese correo"
                  : formState.errors.email?.message
              }
              onKeyDown={(e) => handleKeyDown(e, "email")}
            />

            <Input
              {...register("name")}
              id="name"
              type="text"
              label="Nombre"
              variant="bordered"
              isInvalid={!!formState.errors?.name}
              errorMessage={formState.errors.name?.message}
              onKeyDown={(e) => handleKeyDown(e, "name")}
            />

            <Input
              {...register("password")}
              id="password"
              type="password"
              label="Contraseña"
              variant="bordered"
              isInvalid={!!formState.errors?.password}
              errorMessage={formState.errors.password?.message}
              onKeyDown={(e) => handleKeyDown(e, "password")}
            />

            <Input
              {...register("repeatPassword")}
              id="repeatPassword"
              type="password"
              label="Repetir contraseña"
              variant="bordered"
              isInvalid={!!formState.errors?.repeatPassword}
              errorMessage={formState.errors.repeatPassword?.message}
              onKeyDown={(e) => handleKeyDown(e, "repeatPassword")}
            />

            <AppButton onPress={() => {}} className="w-full" submit dark>
              Registrarse con correo electrónico
            </AppButton>
            <AppButton onPress={handleGoogleRegister} className="w-full" dark>
              <FcGoogle size={22} />
              <h1>Registrarse con Google</h1>
            </AppButton>
          </form>
        </div>
      </div>

      <div className="text-lg flex flex-col gap-6 text-center justify-center items-center">
        <Link
          href="/credentials/login"
          className="font-semibold text-[#ffffff] hover:text-[#cccccc] text-center"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
        <Link
          href="/movies/list"
          className="font-semibold text-white hover:text-[#cccccc] text-center"
        >
          Continuar como invitado
        </Link>
      </div>
    </main>
  );
};

export default RegisterPage;
