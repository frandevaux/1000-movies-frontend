import {
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import router from "next/navigation";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { bebas } from "../app/fonts";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

export const OptionButtonGroup = (props: { router: AppRouterInstance }) => {
  const router = props.router;
  const handleGetRandomMovieId = async () => {
    try {
      const res = await axios.get("/api/random-movie");
      if (res.status === 200) {
        return res.data.id;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        throw error.response?.data;
      }
      throw error;
    }
  };

  return (
    <div className="flex bottom-0 z-20 justify-center absolute pb-10  w-screen">
      <ButtonGroup className="gap-0">
        <Button
          aria-label="Elegir una película al azar"
          className={`${bebas.className} text-3xl w-[15vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={async () => {
            const randomMovieId = await handleGetRandomMovieId();
            router.push("/movies/" + randomMovieId);
          }}
        >
          <TiArrowShuffle />
        </Button>
        <Button
          aria-label="Mostrar todas las películas"
          className={`${bebas.className} text-3xl w-[15vw] h-[6vh] bg-transparent  `}
          isIconOnly
          onPress={() => {
            router.push("/movies/list");
          }}
        >
          <BiSolidMoviePlay />
        </Button>

        <Button
          aria-label="Mostrar todas las películas vistas"
          className={`${bebas.className} text-xl w-[15vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={() => {
            router.push("/movies/list/seen");
          }}
        >
          <FaCheck />
        </Button>

        <Button
          aria-label="Perfil"
          className={`${bebas.className} text-xl w-[15vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={() => {
            router.push("/movies/profile");
          }}
        >
          <FaUserAlt />
        </Button>
      </ButtonGroup>
    </div>
  );
};
