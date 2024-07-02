import { start } from "repl";

export async function GET(request: Request) {
  let movieData;
  const { searchParams } = new URL(request.url);
  const startId = searchParams.get("startId");
  const endId = searchParams.get("endId");
  const name = searchParams.get("name");
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/movies/search?name=${name}&startId=${startId}&endId=${endId}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    movieData = await response.json();
    console.log(startId, endId, name);
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
