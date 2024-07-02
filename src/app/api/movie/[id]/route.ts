export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  let movieData;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/movie/${
        params.id
      }?timestamp=${new Date().getTime()}`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    movieData = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  let updatedData;
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json();
    // Realizar la solicitud PUT al backend
    const response = await fetch(`${process.env.BACKEND_URL}/api/movie/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Datos que se enviarán para la actualización
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    updatedData = await response.json();
  } catch (error) {
    console.error("Error updating data:", error);
    return new Response("Error updating data", { status: 500 });
  }

  return new Response(JSON.stringify(updatedData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
