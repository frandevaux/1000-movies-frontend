"use client";

import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Input,
  ScrollShadow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import { bebas } from "@/app/fonts";
import { Movie } from "@/app/interfaces/movieDataInterfaces";
import { Cartelera } from "@/app/components/cartelera";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiMinus } from "react-icons/bi";

export default function Home() {
  const router = useRouter();
  const [showingSearchBar, setShowingSearchBar] = useState(false);
  const [showingOriginalTitle, setShowingOriginalTitle] = useState(false);
  const [titleFilter, setTitleFilter] = useState<"asc" | "desc" | "none">(
    "none"
  );
  const [releaseFilter, setReleaseFilter] = useState<"asc" | "desc" | "none">(
    "none"
  );
  const [showingFilters, setShowingFilters] = useState(false);
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [movieEndId, setMovieEndId] = useState(20);
  const [allMoviesLoaded, setAllMoviesLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0); // Timestamp del último fetch
  const { ref, inView } = useInView();

  const fetchSearchMovieData = useCallback(
    async (
      searchTerm: string,
      startId: number,
      endId: number,
      titleFilter: string,
      releaseFilter: string
    ) => {
      const url = showingOriginalTitle
        ? `/api/movies/search?name=${searchTerm}&startId=${startId}&endId=${endId}&releaseFilter=${releaseFilter}&originalTitleFilter=${titleFilter}`
        : `/api/movies/search?name=${searchTerm}&startId=${startId}&endId=${endId}&titleFilter=${titleFilter}&releaseFilter=${releaseFilter}`;
      setIsLoading(true);
      try {
        const res = await fetch(url);
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
    [showingOriginalTitle]
  );

  const throttledFetch = useRef(
    // Función para realizar la llamada con cooldown de 1 segundo
    async (
      searchTerm: string,
      startId: number,
      endId: number,
      titleFilter: string,
      releaseFilter: string
    ) => {
      const now = Date.now();
      if (now - lastFetchTime >= 1000) {
        // Si ha pasado más de 1 segundo desde la última llamada
        setLastFetchTime(now);
        await fetchSearchMovieData(
          searchTerm,
          startId,
          endId,
          titleFilter,
          releaseFilter
        );
      } else {
        console.log("Llamada a la API rechazada: cooldown activo.");
      }
    }
  );

  const handleLoadMore = useCallback(() => {
    throttledFetch.current(
      searchTerm,
      movieEndId,
      movieEndId + 20,
      titleFilter,
      releaseFilter
    );

    setMovieEndId((prevEndId) => prevEndId + 20);
  }, [searchTerm, movieEndId, throttledFetch, titleFilter, releaseFilter]);

  useEffect(() => {
    if (inView && !allMoviesLoaded && !isLoading) {
      handleLoadMore();
    }
  }, [inView, allMoviesLoaded, isLoading, handleLoadMore]);

  useEffect(() => {
    if (searchTerm || searchTerm === "" || !showingSearchBar) {
      throttledFetch.current(searchTerm, 0, 20, titleFilter, releaseFilter); // Realiza la búsqueda con o sin término de búsqueda
      setLastFetchTime(Date.now()); // Actualiza el último tiempo de fetch
    }
  }, [searchTerm, showingSearchBar, titleFilter, releaseFilter]);

  // Efecto para actualizar la lista de películas cuando cambian los filtros
  useEffect(() => {
    setMovieList([]);
    setMovieEndId(20);
    setAllMoviesLoaded(false);
    fetchSearchMovieData(searchTerm, 0, 20, titleFilter, releaseFilter);
  }, [titleFilter, releaseFilter, searchTerm, fetchSearchMovieData]);

  const handleNewSearch = (value: string) => {
    setSearchTerm(value);
    setMovieList([]);
    setIsLoading(true);
    setMovieEndId(20);
    setAllMoviesLoaded(false);
  };

  // useEffect para cargar películas al inicio
  useEffect(() => {
    fetchSearchMovieData("", 0, 20, titleFilter, releaseFilter);
  }, [fetchSearchMovieData, titleFilter, releaseFilter]);

  const handleTitleFilter = () => {
    setReleaseFilter("none");
    if (titleFilter === "asc") {
      setTitleFilter("desc");
    } else if (titleFilter === "desc") {
      setTitleFilter("none");
    } else {
      setTitleFilter("asc");
    }
  };

  const handleReleaseFilter = () => {
    setTitleFilter("none");
    if (releaseFilter === "asc") {
      setReleaseFilter("desc");
    } else if (releaseFilter === "desc") {
      setReleaseFilter("none");
    } else {
      setReleaseFilter("asc");
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center text-2xl overflow-hidden">
      <Cartelera
        title="Cartelera"
        showingSearchBar={showingSearchBar}
        setShowingSearchBar={setShowingSearchBar}
        showingFilters={showingFilters}
        setShowingFilters={setShowingFilters}
      />

      <div
        className={`flex justify-center w-screen z-10 transition-opacity duration-300  ${
          showingSearchBar ? "opacity-100 pb-5" : "opacity-0"
        }`}
      >
        {showingSearchBar && (
          <Input
            size="lg"
            className="w-2/3 dark h-[7vh]"
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

      <div
        className={`flex justify-center w-screen z-10 transition-opacity duration-300 ${
          showingFilters ? "opacity-100 pb-5" : "opacity-0"
        }`}
      >
        {showingFilters && (
          <div className="w-full flex justify-center gap-5 h-[7vh] items-center">
            <Checkbox
              isSelected={showingOriginalTitle}
              onValueChange={() =>
                setShowingOriginalTitle(!showingOriginalTitle)
              }
              className="text-lg"
            >
              Título original
            </Checkbox>
            <Button
              variant="light"
              startContent={
                titleFilter === "asc" ? (
                  <IoIosArrowUp className="text-2xl " />
                ) : titleFilter === "desc" ? (
                  <IoIosArrowDown className="text-2xl " />
                ) : (
                  <BiMinus className="text-2xl " />
                )
              }
              onPress={handleTitleFilter}
            >
              Título
            </Button>
            <Button
              variant="light"
              startContent={
                releaseFilter === "asc" ? (
                  <IoIosArrowUp className="text-2xl " />
                ) : releaseFilter === "desc" ? (
                  <IoIosArrowDown className="text-2xl " />
                ) : (
                  <BiMinus className="text-2xl " />
                )
              }
              onPress={handleReleaseFilter}
            >
              Estreno
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-hidden text-ellipsis">
        {isLoading && movieList.length === 0 ? (
          <div className="flex flex-col h-[60vh] justify-center.items-center">
            <CircularProgress size="lg" color="default" />
          </div>
        ) : (
          <ScrollShadow
            className={`overflow-y-scroll overflow-x-hidden w-[90vw] ${
              showingSearchBar || showingFilters
                ? "max-h-[66vh]"
                : "max-h-[74vh]"
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
                    className={
                      movie.seen
                        ? `${bebas.className} text-ellipsis whitespace-nowrap line-through text-neutral-600`
                        : `${bebas.className} text-ellipsis whitespace-nowrap`
                    }
                  >
                    {showingOriginalTitle ? movie.original_title : movie.title}
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
