"use client";
import {
  Button,
  CircularProgress,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Movie } from "../../../interfaces/movieData";
import { bebas, pt_sans } from "../../fonts";
import { updateMovieData } from "@/utils/movieDataUtils";
import { useSession } from "next-auth/react";
import { CastMember } from "@/components/movie/castMember";
import { TopNavBar } from "@/components/movie/topNavBar";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const font = pt_sans.className;
  const { data, status } = useSession();
  const { movieId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<Movie>({} as Movie);
  const [releaseYear, setReleaseYear] = useState(0);
  const [seen, setSeen] = useState(false);
  const [posterModal, setPosterModal] = useState(false);
  const [posterPath, setPosterPath] = useState("");

  // Aquí puedes hacer una llamada a la API o acceder a los datos de la película utilizando el movieId
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`/api/movie/${movieId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const data = await response.json();
        setMovieData(data);
        setReleaseYear(new Date(data.release_date).getFullYear());
        setSeen(data.seen);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieData();
  }, [movieId]);

  const handleSeen = () => {
    // Aquí puedes actualizar el estado de la película a "vista"
    const newSeen = !seen;
    updateMovieData(movieData.id, newSeen);
    setSeen(newSeen);
  };

  return (
    <main className=" flex h-screen flex-col items-center text-2xl overflow-hidden bg-cover w-screen ">
      {isLoading ? (
        <div className="flex flex-col h-screen justify-center items-center ">
          <CircularProgress size="lg" color="default" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[100dvh]   ">
          <div
            className=" brightness-50 blur-xl w-screen h-[110vh] fixed top-0 left-0 -z-2  bg-cover bg-center bg-no-repeat shadow-2xl transition-opacity"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`,
            }}
          ></div>

          <div className="absolute w-screen h-screen top-0 left-0  opacity-90 bg-gradient-to-b     from-black from-10% via-transparent to-black to-100%"></div>
          {posterModal && (
            <>
              <div className="  w-screen h-[110vh] fixed top-0 left-0 z-40 opacity-80  bg-black shadow-2xl transition-opacity"></div>
              <Button
                className="absolute pb-[10vh]   w-screen h-screen bg-transparent  flex justify-center items-center z-40 "
                onClick={() => setPosterModal(false)}
              >
                <Image
                  src={posterPath}
                  alt={movieData.title ?? "No title"}
                  width={350}
                  height={500}
                  className="rounded-md border-white border-2 transition-opacity"
                />
              </Button>
            </>
          )}

          <TopNavBar />

          <ScrollShadow className=" z-20 w-screen h-[95dvh]  top-0 pt-5 text-white flex    flex-col items-center  gap-4">
            <Button
              className=" w-[10rem] min-h-[15.5rem] bg-transparent  "
              onPress={() => {
                setPosterPath(
                  "https://image.tmdb.org/t/p/original/" + movieData.poster_path
                );

                setPosterModal(true);
              }}
              isIconOnly
            >
              <Image
                src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
                alt={movieData.title ?? "No title"}
                width={200}
                height={300}
                className=" rounded-md   border-white border-2 transition-opacity "
              />
            </Button>

            <div className="flex flex-col items-center w-[80vw]">
              <h1 className={`${bebas.className} text-4xl  text-center`}>
                {movieData.title}
              </h1>
              {movieData.title != movieData.original_title && (
                <h2 className={`${font} text-sm text-center `}>
                  {movieData.original_title}
                </h2>
              )}

              <h2 className={`${font} text-sm `}>
                {"Dirigida por " +
                  movieData.director.name +
                  " • " +
                  releaseYear}
              </h2>
            </div>

            <div className="flex flex-col gap-6   ">
              <div className="max-h-[30vh] w-[80vw] ">
                <div className="flex flex-col gap-6 ">
                  <div
                    className={`flex ${
                      status === "authenticated"
                        ? "justify-between"
                        : "justify-center"
                    } w-full `}
                  >
                    <Button
                      variant="flat"
                      radius="full"
                      className="w-[45%] bg-neutral-900   bg-opacity-25"
                      as={Link}
                      target="_blank"
                      href={"https://letterboxd.com/tmdb/" + movieData.id}
                      rel="noopener noreferrer"
                    >
                      Letterboxd
                    </Button>
                    {status === "authenticated" && (
                      <Button
                        variant="flat"
                        radius="full"
                        className={
                          seen
                            ? "w-[45%] bg-white  bg-opacity-25"
                            : "w-[45%] bg-neutral-900   bg-opacity-25"
                        }
                        onPress={handleSeen}
                      >
                        {seen ? "Vista" : "Marcar como vista"}
                      </Button>
                    )}
                  </div>
                  <div className="pb-10">
                    <p className={`${font} text-lg text-justify `}>
                      {movieData.overview}
                    </p>
                    <ScrollShadow
                      orientation="horizontal"
                      size={20}
                      className="  mt-8 px-3 "
                    >
                      <div className="flex gap-4  ">
                        <CastMember
                          name={movieData.director.name}
                          character="Director"
                          profile_path={movieData.director.profile_path}
                          setPosterModal={setPosterModal}
                          setPosterPath={setPosterPath}
                        />
                        <div className=" flex flex-row gap-4 pr-3 justify-center ">
                          {movieData.cast.map((actor) => (
                            <CastMember
                              key={actor.id}
                              name={actor.name}
                              character={actor.character}
                              profile_path={actor.profile_path}
                              setPosterModal={setPosterModal}
                              setPosterPath={setPosterPath}
                            />
                          ))}
                        </div>
                      </div>
                    </ScrollShadow>
                  </div>
                </div>
              </div>
            </div>
          </ScrollShadow>
        </div>
      )}
    </main>
  );
};

export default MoviePage;
