import { movies } from "./movies";

export const getRandomMovieId = (): number | null => {
  // Filter out movies that have been viewed
  const unviewedMovies = movies.filter((movie) => !movie.seen);

  // Check if there are any unviewed movies
  if (unviewedMovies.length === 0) {
    return null; // No unviewed movies found
  }

  // Generate a random index within the range of unviewedMovies array
  const randomIndex = Math.floor(Math.random() * unviewedMovies.length);

  // Get the random movie id
  const randomMovieId = unviewedMovies[randomIndex].id;

  return randomMovieId;
};
