import Image from "next/image";
import { IoMdPerson } from "react-icons/io";

export const CastMember = (params?: {
  name: string;
  character: string;
  profile_path: string;
  font?: string;
}) => {
  const { name, character, profile_path, font } = params || {};

  return (
    <div className="flex flex-col gap-2 ">
      <div className=" w-[6rem]  ">
        {profile_path ? (
          <Image
            src={"https://image.tmdb.org/t/p/w500/" + profile_path}
            alt={name ? name : "Actor"}
            className="rounded-md border-white border-2"
            width={200}
            height={300}
          />
        ) : (
          <div className="w-[7rem] h-[10.25rem] bg-neutral-900 bg-opacity-70 rounded-md border-white border-2 flex">
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
