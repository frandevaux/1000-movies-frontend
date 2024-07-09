import { connectDB } from "@/libs/mongodb";
import movieSchema from "@/models/movie.model";

export const POST = async (request: Request): Promise<Response> => {
  try {
    // Leer el cuerpo de la solicitud
    const { seenMovies } = await request.json();
    // Realizar la solicitud PUT al backend
    await connectDB();
    const randomMovie = await movieSchema.aggregate([
      { $match: { id: { $nin: seenMovies } } }, // Excluye las películas vistas
      { $sample: { size: 1 } }, // Selecciona una película al azar de las no vistas
    ]);

    if (randomMovie.length) {
      const data = randomMovie[0];
      return new Response(JSON.stringify(data), { status: 200 });
    } else {
      return new Response("No unseen movies found", { status: 404 });
    }
  } catch (error) {
    //console.error("Error getting random movie:", error);
    return new Response("Error getting random movie", { status: 500 });
  }
};
