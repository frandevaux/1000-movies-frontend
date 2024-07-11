import { connectDB } from "@/libs/mongodb";
import movieSchema, { Movie } from "@/models/movie.model";
import User from "@/models/user.model";
import { getToken } from "next-auth/jwt";

export const GET = async (request: any): Promise<Response> => {
  try {
    let randomMovie;
    await connectDB();
    const token = await getToken({ req: request });
    if (token) {
      const email = token.email;
      const userFound = await User.findOne({ email: email });
      const seenMovies = userFound.seenMovies;
      const seenMoviesIds = seenMovies.map((movie: { id: string }) => movie.id);
      randomMovie = await movieSchema.aggregate([
        { $match: { id: { $nin: seenMoviesIds } } }, // Excluye las películas vistas
        { $sample: { size: 1 } }, // Selecciona una película al azar de las no vistas
      ]);
      if (randomMovie.length) {
        return new Response(JSON.stringify(randomMovie[0]), { status: 200 });
      }
    } else {
      console.log("No token found");
      randomMovie = await movieSchema.aggregate([
        { $sample: { size: 1 } }, // Selecciona una película al azar de las no vistas
      ]);
      if (randomMovie.length) {
        return new Response(JSON.stringify(randomMovie[0]), { status: 200 });
      }
    }
    return new Response("No movie found", { status: 404 });
  } catch (error) {
    //console.error("Error getting random movie:", error);
    return new Response("Error getting random movie", { status: 500 });
  }
};
