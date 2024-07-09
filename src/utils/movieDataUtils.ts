import { Movie } from "../interfaces/movieDataInterfaces";

export const updateMovieData = async (id: number, updatedData: Movie) => {
  try {
    const res = await fetch(`/api/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) {
      throw new Error("Failed to update movie");
    }

    const data = await res.json();
    // Actualiza el estado o maneja los datos actualizados aquí
    //console.log("Movie updated:", data);
  } catch (error) {
    console.error("Error updating movie data:", error);
  }
};
