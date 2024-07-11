import axios from "axios";

export const updateMovieData = async (id: number, seen: boolean) => {
  try {
    const res = await axios.put(`/api/movie/${id}`, { seen });
    if (res.status !== 200) {
      throw new Error("Failed to update movie");
    }

    const data = res.data;
    // Actualiza el estado o maneja los datos actualizados aquí
    console.log("Movie updated:", data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error updating movie data:", error.response.data);
    } else {
      console.error("Error updating movie data:", error);
    }
  }
};
