export async function GET(request: Request) {
  return new Response(process.env.BACKEND_URL);
}
