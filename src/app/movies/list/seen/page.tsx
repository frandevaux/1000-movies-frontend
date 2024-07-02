"use client";

import { Cartelera } from "@/app/components/cartelera";
import { bebas } from "@/app/fonts";
import { Movie } from "@/app/interfaces/movieDataInterfaces";
import {
  Button,
  CircularProgress,
  Divider,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const router = useRouter();
  const [showingSearchBar, setShowingSearchBar] = useState(false);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [movieEndId, setMovieEndId] = useState(20);
  const [allMoviesLoaded, setAllMoviesLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0); // Timestamp del último fetch
  const { ref, inView } = useInView();

  const fetchSearchMovieData = useCallback(
    async (searchTerm: string, startId: number, endId: number) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/movies/seen/search?name=${searchTerm}&startId=${startId}&endId=${endId}`
        );
        const newData = await res.json();
        if (newData.length === 0) {
          setAllMoviesLoaded(true);
        } else {
          if (startId === 0) {
            // New search
            setMovieList(newData);
          } else {
            // Load more
            setMovieList((prev) => [...prev, ...newData]);
          }
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const throttledFetch = useRef(
    // Función para realizar la llamada con cooldown de 1 segundo
    async (searchTerm: string, startId: number, endId: number) => {
      const now = Date.now();
      if (now - lastFetchTime >= 1000) {
        // Si ha pasado más de 1 segundo desde la última llamada
        setLastFetchTime(now);
        await fetchSearchMovieData(searchTerm, startId, endId);
      } else {
        console.log("Llamada a la API rechazada: cooldown activo.");
      }
    }
  );

  const handleLoadMore = useCallback(() => {
    throttledFetch.current(searchTerm, movieEndId, movieEndId + 20);
    setMovieEndId((prevEndId) => prevEndId + 20);
  }, [searchTerm, movieEndId]);

  useEffect(() => {
    if (inView && !allMoviesLoaded && !isLoading) {
      handleLoadMore();
    }
  }, [inView, allMoviesLoaded, isLoading, handleLoadMore]);

  useEffect(() => {
    if (searchTerm || searchTerm === "" || !showingSearchBar) {
      throttledFetch.current(searchTerm, 0, 20); // Realiza la búsqueda con o sin término de búsqueda
      setLastFetchTime(Date.now()); // Actualiza el último tiempo de fetch
    }
  }, [searchTerm, showingSearchBar]);

  const handleNewSearch = (value: string) => {
    setSearchTerm(value);
    setMovieList([]);
    setIsLoading(true);
    setMovieEndId(20);
    setAllMoviesLoaded(false);
  };

  // useEffect para cargar películas al inicio
  useEffect(() => {
    fetchSearchMovieData("", 0, 20);
  }, [fetchSearchMovieData]);

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden">
      <Cartelera
        showingSearchBar={showingSearchBar}
        setShowingSearchBar={setShowingSearchBar}
      />

      <div
        className={`flex justify-center w-screen   z-10 transition-opacity duration-300 ${
          showingSearchBar ? "opacity-100 pb-5" : "opacity-0"
        }`}
      >
        {showingSearchBar && (
          <Input
            size="lg"
            className="w-2/3 dark"
            classNames={{
              inputWrapper:
                "bg-default-200/30 group-data-[focus=true]:bg-default-200/30 ",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
            }}
            placeholder="Buscar película"
            endContent={<IoSearch />}
            onValueChange={handleNewSearch}
          />
        )}
      </div>

      <div className="overflow-hidden text-ellipsis">
        {isLoading && movieList.length === 0 ? (
          <div className="flex flex-col h-[60vh] justify-center items-center">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : (
          <ScrollShadow
            className={`overflow-y-scroll overflow-x-hidden w-[90vw] ${
              showingSearchBar ? "max-h-[66vh]" : "max-h-[74vh]"
            } `}
          >
            {movieList.map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col items-center justify-center"
              >
                <Button
                  aria-label="Mostrar detalles de la película"
                  variant="light"
                  className="text-2xl"
                  onPress={() => {
                    router.push("/movies/" + movie.id);
                  }}
                >
                  <h2
                    className={`${bebas.className} text-ellipsis whitespace-nowrap`}
                  >
                    {movie.title}
                  </h2>
                </Button>
                <Divider className="my-2 w-2/3" />
              </div>
            ))}
            {!allMoviesLoaded && (
              <div className="my-4 flex justify-center">
                <CircularProgress size="lg" color="default" ref={ref} />
              </div>
            )}
          </ScrollShadow>
        )}
      </div>
    </main>
  );
}
