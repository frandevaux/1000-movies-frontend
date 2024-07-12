"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Divider, Input, Link } from "@nextui-org/react";
import { AppButton } from "@/components/appButton";
import { FcGoogle } from "react-icons/fc";
import { bebas, inter, jost, pt_sans } from "../fonts";

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    target: string
  ): void => {
    if (event.key === "Enter") {
      switch (target) {
        case "email":
          passwordRef.current?.focus(); // Mueve el foco al siguiente input
          break;
        case "password":
          handleLogin(); // Ejecuta el login en el último input
          break;
        default:
          break;
      }
    }
  };
  const handleGoogleRegister = async () => {
    await signIn("google", { callbackUrl: "/movies/list" });
  };

  const handleLogin = async () => {
    setInvalidCredentials(false);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        if (res.status === 401) {
          setInvalidCredentials(true);
        }
      } else {
        router.push("/movies/list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl justify-center gap-10   overflow-hidden  ">
      <div>
        <div className="flex flex-col  text-center gap-5 w-[80vw]">
          <h1 className={`${bebas.className} text-6xl `}>Ingresar</h1>
          <p className="text-lg font-medium">
            Inicia sesión con tu correo electrónico o con Google
          </p>
        </div>
        <div className="flex flex-col items-center mt-5  gap-10 pb-10">
          <div className="flex flex-col items-center gap-3">
            <Input
              ref={emailRef}
              type="email"
              label="Correo electrónico"
              variant="bordered"
              isInvalid={invalidCredentials}
              errorMessage={invalidCredentials ? "Credenciales inválidas" : ""}
              value={email}
              onValueChange={setEmail}
              onKeyDown={(e) => handleKeyDown(e, "email")}
            />

            <Input
              ref={passwordRef}
              type="password"
              label="Contraseña"
              variant="bordered"
              isInvalid={invalidCredentials}
              value={password}
              onValueChange={setPassword}
              onKeyDown={(e) => handleKeyDown(e, "password")}
            />

            <AppButton onPress={handleLogin} className="w-[80vw]" dark>
              Continuar con correo electrónico
            </AppButton>
            <AppButton onPress={handleGoogleRegister} className="w-[80vw]" dark>
              <FcGoogle size={22} />
              <h1>Continuar con Google</h1>
            </AppButton>
          </div>
        </div>
      </div>

      <div className="text-lg flex flex-col  gap-6 text-center justify-center items-center ">
        <Link
          href="/register"
          className="font-semibold text-white hover:text-[#cccccc]"
        >
          ¿No tienes cuenta? Regístrate
        </Link>
        <Link
          href="/movies/list"
          className="font-semibold text-white hover:text-[#cccccc]"
        >
          Continuar como invitado
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
