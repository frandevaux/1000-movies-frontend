import { connectDB } from "@/libs/mongodb";
import { Movie } from "@/models/movie.model";
import User from "@/models/user.model";
import { getToken } from "next-auth/jwt";

export async function GET(request: any) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startId = searchParams.get("startId");
    const name = searchParams.get("name");
    const token = await getToken({ req: request });
    if (!token) {
      return new Response("Not logged", { status: 401 });
    }
    const user = await User.findOne({ email: token.email });
    const seenMovies = user?.seenMovies;

    let seenMoviesData;
    // Extrae los IDs de las películas vistas
    const seenMovieIds = seenMovies.map((movie: { id: string }) => movie.id);

    if (startId) {
      seenMoviesData = await Movie.aggregate([
        {
          $match: {
            title: { $regex: name, $options: "i" }, // Busca coincidencias que contengan 'name'
            id: { $in: seenMovieIds }, // Filtra por películas vistas
          },
        },
        {
          $addFields: {
            // Añade un campo 'seen_date' a cada documento de película basado en el array 'seenMovies' del usuario
            seen_date: {
              $let: {
                vars: {
                  seenMovie: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: seenMovies,
                          as: "seenMovie",
                          cond: { $eq: ["$$seenMovie.id", "$id"] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: "$$seenMovie.seen_date",
              },
            },
          },
        },
        { $sort: { seen_date: -1 } }, // Ordena los resultados por 'seen_date' descendente
        { $skip: parseInt(startId, 10) },
        { $limit: 20 },
      ]);
    } else {
      seenMoviesData = await Movie.aggregate([
        {
          $match: {
            title: { $regex: name, $options: "i" },
            id: { $in: seenMovieIds },
          },
        },
        {
          $addFields: {
            seen_date: {
              $let: {
                vars: {
                  seenMovie: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: seenMovies,
                          as: "seenMovie",
                          cond: { $eq: ["$$seenMovie.id", "$id"] },
                        },
                      },
                      0,
                    ],
                  },
                },
                in: "$$seenMovie.seen_date",
              },
            },
          },
        },
        { $sort: { seen_date: -1 } },
        { $limit: 20 },
      ]);
    }

    return new Response(JSON.stringify(seenMoviesData), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response("Error fetching movie data", { status: 500 });
  }
}
