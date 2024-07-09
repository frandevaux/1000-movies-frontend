export const getRandomMovieId = async (
  seenMovies: number[]
): Promise<number> => {
  try {
    const res = await fetch(`/api/random-movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seenMovies }),
    });
    if (!res.ok) {
      throw new Error("Failed to get random movie");
    }

    const data = await res.json();
    return data.id;
  } catch (error) {
    console.error("Error getting random movie:", error);
    throw error; // Throw the error to the caller
  }
};
