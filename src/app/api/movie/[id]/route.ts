import { connectDB } from "@/libs/mongodb";
import movieSchema, { Movie } from "@/models/movie.model";
import { User } from "@/models/user.model";
import { getToken } from "next-auth/jwt";

export async function GET(
  _request: any,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const token = await getToken({ req: _request });
  let movieData;

  try {
    await connectDB();
    if (!token) {
      movieData = await movieSchema.findOne({ id: id });
      if (!movieData) {
        // Manejo en caso de respuesta vacía
        return new Response("No movie data found", { status: 404 });
      }
      return new Response(JSON.stringify(movieData), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    } else {
      const user = await User.findOne({ email: token.email });
      const seenMovies = user?.seenMovies;
      const seenMovieIds = seenMovies.map((movie: { id: string }) => movie.id);
      movieData = await movieSchema.findOne({ id: id });

      if (!movieData) {
        return new Response("No movie data found", { status: 404 });
      }

      // Agregar el campo 'seen' a los datos de la película
      movieData = movieData.toObject(); // Convertir a objeto si es necesario
      movieData.seen = seenMovieIds.includes(parseInt(id));

      return new Response(JSON.stringify(movieData), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (error) {
    return new Response("Error fetching movie data", { status: 500 });
  }
}

export async function PUT(
  request: any,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const numberId = parseInt(id);
  const token = await getToken({ req: request });
  const { seen } = await request.json();
  let movieData;

  try {
    await connectDB();
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    } else {
      const user = await User.findOne({ email: token.email });
      let seenMovies = user?.seenMovies;
      const seenMovieIds = seenMovies.map((movie: { id: number }) => movie.id);
      movieData = await movieSchema.findOne({ id: id });

      if (!movieData) {
        return new Response("No movie data found", { status: 404 });
      }

      // Actualizar el estado de la película
      const newSeen = seen;
      if (newSeen && !seenMovieIds.includes(parseInt(id))) {
        seenMovies.push({ id: numberId, seen_date: new Date() });
      } else {
        seenMovies = seenMovies.filter(
          (movie: { id: number }) => movie.id !== numberId
        );
      }

      await User.updateOne(
        { email: token.email },
        { $set: { seenMovies: seenMovies } }
      );

      return new Response("Movie data updated", {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      });
    }
  } catch (error) {
    return new Response("Error updating movie data", { status: 500 });
  }
}
