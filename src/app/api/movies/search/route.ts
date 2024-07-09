import { connectDB } from "@/libs/mongodb";
import movieSchema from "@/models/movie.model";
import { SortOrder } from "mongoose";

export async function GET(request: Request) {
  let movieData;
  const { searchParams } = new URL(request.url);
  const startId = searchParams.get("startId");
  const endId = searchParams.get("endId");
  const name = searchParams.get("name");
  const titleFilter = searchParams.get("titleFilter");
  const releaseFilter = searchParams.get("releaseFilter");
  const originalTitleFilter = searchParams.get("originalTitleFilter");
  try {
    await connectDB();
    // Construye el filtro de búsqueda para buscar 'name' tanto en 'title' como en 'originalTitle'
    let sortCriteria: {
      title?: number;
      original_title?: number;
      release_date?: number;
      list_id: number;
    } = { list_id: 1 };

    // Añadir criterio de ordenamiento para 'title' si está definido
    if (titleFilter === "asc") {
      sortCriteria.title = 1;
    } else if (titleFilter === "desc") {
      sortCriteria.title = -1;
    }

    // Añadir criterio de ordenamiento para 'original_title' si está definido
    if (originalTitleFilter === "asc") {
      sortCriteria.original_title = 1;
    } else if (originalTitleFilter === "desc") {
      sortCriteria.original_title = -1;
    }

    // Añadir criterio de ordenamiento para 'release_date' si está definido
    if (releaseFilter === "asc") {
      sortCriteria.release_date = 1;
    } else if (releaseFilter === "desc") {
      sortCriteria.release_date = -1;
    }
    const searchFilter = {
      $or: [
        { title: { $regex: name, $options: "i" } },
        { original_title: { $regex: name, $options: "i" } },
      ],
    };
    let movies;
    if (startId) {
      movies = await movieSchema
        .find(searchFilter)
        .sort(sortCriteria as { [key: string]: SortOrder | { $meta: any } })
        .skip(parseInt(startId, 10))
        .limit(20);
    } else {
      movies = await movieSchema
        .find(searchFilter)
        .sort(sortCriteria as { [key: string]: SortOrder | { $meta: any } })
        .limit(20);
    }
    return new Response(JSON.stringify(movies), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    //console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }
}
