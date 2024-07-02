"use client";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMovieData } from "../../tmdbApi";
import { Movie } from "../../interfaces/movieDataInterfaces";
import { bebas, pt_sans } from "../../fonts";
import router from "next/router";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";
import { TiArrowShuffle } from "react-icons/ti";
import { getRandomMovieId } from "../../shuffle";
import { useRouter } from "next/navigation";
import { updateMovieData } from "../../utils/movieDataUtils";
import { IoMdPerson } from "react-icons/io";
import { OptionButtonGroup } from "../../components/optionButtonGroup";

const MoviePage = ({ params }: { params: { movieId: string } }) => {
  const router = useRouter();
  const { movieId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [movieData, setMovieData] = useState<Movie>({} as Movie);
  const [releaseYear, setReleaseYear] = useState(0);
  const [seen, setSeen] = useState(false);
  // Aquí puedes hacer una llamada a la API o acceder a los datos de la película utilizando el movieId
  useEffect(() => {
    const fetchMovieData = async () => {
      await fetch("/api/movie/" + movieId)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            console.log(data);
            setMovieData(data[0]);
            const releaseYear = new Date(data[0].release_date).getFullYear();
            setReleaseYear(releaseYear);
            setSeen(data[0].seen);
            setIsLoading(false);
          } else {
            // Manejar el caso en que data está vacío o no es como se esperaba
            console.log("No hay datos disponibles");
          }
        });
    };
    fetchMovieData();
  }, [movieId]);

  const handleSeen = () => {
    // Aquí puedes actualizar el estado de la película a "vista"
    const newSeen = !seen;
    const modifiedData = { ...movieData, seen: newSeen };
    updateMovieData(movieData.id, modifiedData);
    setSeen(newSeen);
  };

  return (
    <main className=" flex h-screen flex-col items-center text-2xl overflow-hidden bg-cover w-screen ">
      {isLoading ? (
        <div className="flex flex-col h-screen justify-center items-center ">
          <CircularProgress size="lg" color="default" />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <div
            className=" brightness-50 blur-xl w-screen h-[110vh] fixed top-0 left-0 -z-2  bg-cover bg-center bg-no-repeat shadow-2xl transition-opacity"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieData.poster_path})`,
            }}
          ></div>
          <div className="absolute w-screen h-screen top-0 left-0  opacity-90 bg-gradient-to-b     from-black from-10% via-transparent to-black to-100%"></div>
          <div className=" z-20 w-screen h-screen text-white flex pt-20   flex-col items-center p-10 gap-4">
            <Image
              src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
              alt={movieData.title ?? "No title"}
              width={200}
              height={300}
              className=" rounded-md   border-white border-2 transition-opacity "
            />
            <div className="flex flex-col items-center overflow-scroll max-h-[9.5vh]">
              <h1 className={`${bebas.className} text-4xl  text-center`}>
                {movieData.title}
              </h1>
              {movieData.title != movieData.original_title && (
                <h2 className={`${pt_sans.className} text-sm text-center `}>
                  {movieData.original_title}
                </h2>
              )}

              <h2 className={`${pt_sans.className} text-sm `}>
                {"Dirigida por " +
                  movieData.director.name +
                  " • " +
                  releaseYear}
              </h2>
            </div>

            <div className="flex flex-col gap-6 overflow-hidden  ">
              <ScrollShadow className="max-h-[30vh] w-[80vw] ">
                <div className="flex flex-col gap-6 ">
                  <div className="flex  justify-between ">
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
                  </div>
                  <div>
                    <p className={`${pt_sans.className} text-lg `}>
                      {movieData.overview}
                    </p>
                    <ScrollShadow
                      orientation="horizontal"
                      size={20}
                      className="  mt-8 px-3 "
                    >
                      <div className="flex gap-4  ">
                        <div
                          key={movieData.director.id}
                          className="flex flex-col gap-2"
                        >
                          <div className=" w-[6rem]   ">
                            <Image
                              src={
                                "https://image.tmdb.org/t/p/w500/" +
                                movieData.director.profile_path
                              }
                              alt={movieData.director.name}
                              className="rounded-md border-white border-2 transition-opacity"
                            />
                          </div>

                          <div>
                            <p className={`${pt_sans.className} text-sm `}>
                              {movieData.director.name}
                            </p>
                            <p className={`${pt_sans.className} text-xs `}>
                              {movieData.director.job}
                            </p>
                          </div>
                        </div>
                        <div className=" flex flex-row gap-4 pr-3 justify-center ">
                          {movieData.cast.map((actor) => (
                            <div
                              key={actor.id}
                              className="flex flex-col gap-2 "
                            >
                              <div className=" w-[6rem]  ">
                                {actor.profile_path ? (
                                  <Image
                                    src={
                                      "https://image.tmdb.org/t/p/w500/" +
                                      actor.profile_path
                                    }
                                    alt={actor.name}
                                    className="rounded-md border-white border-2"
                                  />
                                ) : (
                                  <div className="w-[7rem] h-[10.25rem] bg-neutral-900 bg-opacity-70 rounded-md border-white border-2 flex">
                                    <IoMdPerson size={50} className="m-auto" />
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className={`${pt_sans.className} text-sm `}>
                                  {actor.name}
                                </p>
                                <p className={`${pt_sans.className} text-xs `}>
                                  {actor.character}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ScrollShadow>
                  </div>
                </div>
              </ScrollShadow>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MoviePage;
