"use client";

import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Cartelera } from "@/components/cartelera";

import { logoutRequest } from "@/app/api/user/auth";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

type CustomSession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    seenMovies?: any[]; // Adjust the type of seenMovies as needed
  };
};

import { Session } from "inspector";
import { AppButton } from "@/components/appButton";
import { LoginModal } from "@/components/loginModal";

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: string;
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden ">
      <Cartelera title="Perfil" />

      <div className="overflow-hidden text-ellipsis h-[60vh]">
        {status === "loading" ? (
          <div className="flex flex-col  justify-center items-center h-full">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center mt-5 justify-center h-full gap-3">
            <h1>¡Bienvenido {session.user?.name}!</h1>
            <h1>
              Peliculas vistas:{" "}
              {session.user?.seenMovies?.length ?? 0 > 0
                ? session.user?.seenMovies?.length ?? 0
                : "0"}
              {"/1000"}
            </h1>
            <AppButton onPress={handleLogout} className="w-[80vw]">
              Cerrar sesión
            </AppButton>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-5 justify-center h-full gap-3">
            <LoginModal message="Inicia sesión para ver tu perfil" />
          </div>
        )}
      </div>
    </main>
  );
}
