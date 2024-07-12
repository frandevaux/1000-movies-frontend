"use client";

import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Cartelera } from "@/components/cartelera";
import { signOut, useSession } from "next-auth/react";

type CustomSession = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    seenMovies?: any[]; // Adjust the type of seenMovies as needed
  };
};

import { AppButton } from "@/components/appButton";
import { LoginModal } from "@/components/loginModal";
import axios from "axios";

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [seenMoviesAmount, setSeenMoviesAmount] = useState(0);

  const { data: session, status } = useSession() as {
    data: CustomSession;
    status: string;
  };
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const fetchSeenMovies = async () => {
    try {
      const response = await axios.get("/api/user/seenMovies");
      setSeenMoviesAmount(response.data.seenMoviesAmount);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        console.log("User not logged in");
      }
      console.error("Error fetching seen movies:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session) {
      fetchSeenMovies();
    }
  }, [session]);

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden ">
      <Cartelera title="Perfil" />

      <div className="overflow-hidden text-ellipsis h-[60vh]">
        {isLoading || status == "loading" ? (
          <div className="flex flex-col  justify-center items-center h-full">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : status === "authenticated" ? (
          <div className="flex flex-col items-center mt-5 justify-center h-full gap-3">
            <h1>¡Bienvenido {session.user?.name}!</h1>
            <h1>
              Has visto {seenMoviesAmount}{" "}
              {seenMoviesAmount === 1
                ? "película de 1000 "
                : "películas de 1000 "}
              {seenMoviesAmount == 0 && "😞"}
              {seenMoviesAmount == 1000 && "🤠"}
            </h1>
            <AppButton onPress={handleLogout} className="w-[80vw]" dark>
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
