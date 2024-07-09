import { connectDB } from "@/libs/mongodb";
import movieSchema from "@/models/movie.model";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await connectDB();
    const movieData = await movieSchema.find({ id: id });
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
  } catch (error) {
    return new Response("Error fetching movie data", { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  try {
    // Leer el cuerpo de la solicitud
    await connectDB();
    const updatedData = await movieSchema.updateOne({ id: id }, { $set: body });
    return new Response(JSON.stringify(updatedData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating movie data:", error);
    return new Response("Error updating movie data", { status: 500 });
  }
}
