import { pt_sans } from "@/app/fonts";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { IoMdPerson } from "react-icons/io";

export const CastMember = (params?: {
  name: string;
  character: string;
  profile_path: string;
  setPosterModal: any;
  setPosterPath: any;
}) => {
  const font = pt_sans.className;
  const { name, character, profile_path, setPosterModal, setPosterPath } =
    params || {};

  return (
    <div className="flex flex-col gap-2 ">
      <div className=" ">
        {profile_path ? (
          <Button
            isIconOnly
            className="h-[9rem] w-[6rem] bg-transparent rounded-none  "
            onPress={() => {
              setPosterPath(
                "https://image.tmdb.org/t/p/original/" + profile_path
              );

              setPosterModal(true);
            }}
          >
            <Image
              src={"https://image.tmdb.org/t/p/w500/" + profile_path}
              alt={name ? name : "Actor"}
              className="rounded-md border-white border-2"
              width={200}
              height={300}
            />
          </Button>
        ) : (
          <div className="h-[9rem] w-[6rem] bg-neutral-900 bg-opacity-70 rounded-md border-white border-2 flex">
            <IoMdPerson size={50} className="m-auto" />
          </div>
        )}
      </div>

      <div>
        <p className={`${font} text-sm `}>{name}</p>
        <p className={`${font} text-xs `}>{character}</p>
      </div>
    </div>
  );
};
