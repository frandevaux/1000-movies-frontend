import { start } from "repl";
import movieSchema from "@/models/movie.model";
import { useAuth } from "@/context/AuthContext";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startId = searchParams.get("startId");
  const name = searchParams.get("name");

  // Move the useAuth function call inside a React component
  async function MyComponent() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return new Response("Unauthorized", { status: 401 });
    }
    let seenMoviesData;
    if (startId) {
      seenMoviesData = await movieSchema
        .find({
          name: { $regex: name, $options: "i" }, // Busca coincidencias que contengan 'name', insensible a mayúsculas
          id: { $in: user?.seenMovies }, // Excluye películas cuyos IDs estén en el array de vistas
        })
        .skip(parseInt(startId, 10))
        .limit(20);
    } else {
      seenMoviesData = await movieSchema
        .find({
          name: { $regex: name, $options: "i" }, // Busca coincidencias que contengan 'name', insensible a mayúsculas
          id: { $in: user?.seenMovies }, // Excluye películas cuyos IDs estén en el array de vistas
        })
        .limit(20);
    }

    return new Response(JSON.stringify(seenMoviesData), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }

  return MyComponent();
}
