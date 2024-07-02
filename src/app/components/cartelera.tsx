import { Button, Divider } from "@nextui-org/react";
import { IoIosStar } from "react-icons/io";
import { bebas } from "../fonts";
import { Dispatch, SetStateAction } from "react";

export const Cartelera = (params: {
  showingSearchBar: boolean;
  setShowingSearchBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const { showingSearchBar, setShowingSearchBar } = params;
  return (
    <div className="flex items-center flex-col w-full justify-center p-8  gap-2">
      <div className="flex items-center justify-center  gap-5">
        <IoIosStar size={40} className="pb-1 " />
        <h1 className={`${bebas.className} text-6xl `}>CARTELERA</h1>
        <Button
          onPress={() => setShowingSearchBar(!showingSearchBar)}
          isIconOnly
          className="bg-transparent"
        >
          <IoIosStar size={40} className="pb-1" />
        </Button>
      </div>
      <Divider className=" h-1 w-[90%]" />
    </div>
  );
};
