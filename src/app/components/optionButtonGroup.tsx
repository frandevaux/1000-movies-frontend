import {
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import router from "next/navigation";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { bebas } from "../fonts";
import { getRandomMovieId } from "../shuffle";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const OptionButtonGroup = (props: { router: AppRouterInstance }) => {
  const PopoverFilterAll = () => {
    return (
      <PopoverContent className="dark ">
        <div className="px-1 py-2 flex flex-col rounded-none">
          <Button
            onPress={() => router.push("/movies/list")}
            className="rounded-none"
          >
            Nombre ascendente
          </Button>
          <Button
            variant="light"
            onPress={() => router.push("/movies/list/desc")}
          >
            Nombre descendente
          </Button>
        </div>
      </PopoverContent>
    );
  };

  const router = props.router;
  return (
    <div className="flex bottom-0 z-20 justify-center absolute pb-10  w-screen">
      <ButtonGroup>
        <Button
          aria-label="Elegir una película al azar"
          className={`${bebas.className} text-3xl w-[20vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={() => {
            let randomMovieId = getRandomMovieId();
            router.push("/movies/" + randomMovieId);
          }}
        >
          <TiArrowShuffle />
        </Button>
        <Button
          aria-label="Mostrar todas las películas"
          className={`${bebas.className} text-3xl w-[20vw] h-[6vh] bg-transparent  `}
          isIconOnly
          onPress={() => {
            router.push("/");
          }}
        >
          <BiSolidMoviePlay />
        </Button>

        <Button
          aria-label="Mostrar todas las películas vistas"
          className={`${bebas.className} text-xl w-[20vw] h-[6vh] bg-transparent `}
          isIconOnly
          onPress={() => {
            router.push("/movies/list/seen");
          }}
        >
          <FaCheck />
        </Button>
      </ButtonGroup>
    </div>
  );
};
