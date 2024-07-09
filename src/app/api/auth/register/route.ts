export const POST = async (request: Request): Promise<Response> => {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json();
    console.log("body", body);
    // Realizar la solicitud PUT al backend
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/random-movie`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body), // Datos que se enviarán para la actualización
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    //console.error("Error getting random movie:", error);
    return new Response("Error getting random movie", { status: 500 });
  }
};
