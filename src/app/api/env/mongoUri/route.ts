export async function GET() {
  const { MONGODB_URI } = process.env;
  return new Response(JSON.stringify({ MONGODB_URI }));
}
