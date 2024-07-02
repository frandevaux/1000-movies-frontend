export async function GET(
  request: Request,
  { params }: { params: { startId: string; endId: string } }
) {
  let movieData;
  const { searchParams } = new URL(request.url);
  const startId = searchParams.get("startId");
  const endId = searchParams.get("endId");

  try {
    const response = await fetch(
      `http://localhost:9000/api/movies/seen/ascOriginalName?startId=${startId}&endId=${endId}`,
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
