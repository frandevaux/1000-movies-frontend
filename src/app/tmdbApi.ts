export async function fetchMovieData(movieId: number) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=es-US`;
  const apiKey = "Bearer " + process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.results.length > 0) {
      console.log(data.results[0]);
      return data.results[0];
    }
  } catch (error) {
    console.error(error);
  }
}
