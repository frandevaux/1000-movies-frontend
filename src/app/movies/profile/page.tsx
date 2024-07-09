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
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { bebas } from "@/app/fonts";
import { Movie } from "@/interfaces/movieDataInterfaces";
import { Cartelera } from "@/components/cartelera";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiMinus } from "react-icons/bi";

export default function Profile() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/signout`);
      if (!res.ok) {
        console.error("Error signing out:", res.statusText);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden">
      <Cartelera title="Perfil" />

      <div className="overflow-hidden text-ellipsis">
        {isLoading ? (
          <div className="flex flex-col h-[60vh] justify-center.items-center">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Button variant="light" onPress={handleSignOut}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
