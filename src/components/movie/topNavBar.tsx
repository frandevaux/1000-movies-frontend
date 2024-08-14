import {
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import router, { useRouter } from "next/navigation";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCheck, FaUserAlt } from "react-icons/fa";
import { TiArrowShuffle, TiHome } from "react-icons/ti";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";
import { bebas } from "@/app/fonts";

export const TopNavBar = (props: {}) => {
  const router = useRouter();
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
    <div className="pt-5 px-10 absolute top-0 w-screen flex justify-between z-30">
      <Button
        isIconOnly
        className="bg-neutral-900 bg-opacity-60"
        onPress={() => {
          router.push("/movies/list");
        }}
      >
        <TiHome size={"1.5rem"} />
      </Button>
      <Button
        isIconOnly
        className="bg-neutral-900 bg-opacity-60     "
        onPress={async () => {
          const randomMovieId = await handleGetRandomMovieId();
          router.push("/movies/" + randomMovieId);
        }}
      >
        <TiArrowShuffle size={"1.5rem"} />
      </Button>
    </div>
  );
};
