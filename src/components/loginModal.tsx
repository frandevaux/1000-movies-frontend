import { jost, pt_sans } from "@/app/fonts";
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { AppButton } from "./appButton";

export const LoginModal = ({ message }: { message: string }) => {
  const router = useRouter();
  return (
    <div className="fixed inset-0 flex justify-center items-center dark">
      <div className=" p-5 rounded-lg w-[80vw] flex flex-col items-center justify-center gap-5 text-center">
        <h1 className={` ${jost.className} text-2xl  `}>{message}</h1>
        <Divider />
        <AppButton
          onPress={() => router.push("/login")}
          className="w-[80%]"
          dark
        >
          Iniciar sesión
        </AppButton>
      </div>
    </div>
  );
};
