"use client";
import { bebas, inter, jost, market_deco, pt_sans } from "../fonts";
import { AppButton } from "@/components/appButton";
import { Divider, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { FcGoogle } from "react-icons/fc";
import { IoIosStar } from "react-icons/io";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl justify-center gap-10 pb-20 overflow-hidden transition-opacity">
      <div className="flex flex-col items-center justify-center w-[80vw]">
        <div className="flex flex-col  text-center  w-[80vw] pb-5">
          <div className="flex w-full items-center justify-between  ">
            <IoIosStar size={40} className="pb-1 " />
            <h1 className={`${bebas.className} text-6xl `}>Cartelera</h1>
            <IoIosStar size={40} className="pb-1 " />
          </div>
          <Divider className=" h-1" />

          <p className={`${market_deco.className} text-xl pt-1 `}>
            1000 PELIS PARA VER ANTES DE MORIR
          </p>
        </div>
        <p className="text-lg font-medium text-center py-5">
          Explora una selección de películas esenciales para los amantes del
          cine.
        </p>
        <div className="flex flex-col items-center mt-5  gap-10 pb-10">
          <div className="flex flex-col items-center gap-3">
            <AppButton
              onPress={() => {
                router.push("/credentials/login");
              }}
              className="w-[80vw]"
            >
              Iniciar sesión
            </AppButton>
            <AppButton
              onPress={() => {
                router.push("/credentials/register");
              }}
              className="w-[80vw]"
              dark
            >
              Registrarse
            </AppButton>
          </div>
        </div>
      </div>

      <div className="text-lg flex flex-col  gap-6 text-center justify-center items-center ">
        <Link
          href="/movies/list"
          className="font-semibold text-[#ffffff] hover:text-[#cccccc]"
        >
          Continuar como invitado
        </Link>
      </div>
    </main>
  );
}
