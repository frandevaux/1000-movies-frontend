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
import { getRandomMovieId } from "../utils/shuffle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const OptionButtonGroup = (props: { router: AppRouterInstance }) => {
  const router = props.router;
  return (
    <div className="flex bottom-0 z-20 justify-center absolute pb-10  w-screen">
      <ButtonGroup className="gap-0">
        <Button
          aria-label="Elegir una película al azar"
          className={`${bebas.className} text-3xl w-[15vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={async () => {
            let randomMovieId = await getRandomMovieId([]);
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
            router.push("/");
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
