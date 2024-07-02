import { start } from "repl";

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
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/movies/search?name=${name}&startId=${startId}&endId=${endId}&titleFilter=${titleFilter}&releaseFilter=${releaseFilter}&originalTitleFilter=${originalTitleFilter} `,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    movieData = await response.json();
  } catch (error) {
    //console.error("Error fetching data:", error);
    return new Response("Error fetching data", { status: 500 });
  }

  if (!movieData) {
    // Manejo en caso de respuesta vacía
    return new Response("No data found", { status: 404 });
  }

  return new Response(JSON.stringify(movieData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
