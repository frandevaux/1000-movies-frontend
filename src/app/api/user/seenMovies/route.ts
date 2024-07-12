import { connectDB } from "@/libs/mongodb";
import User from "@/models/user.model";
import { getToken } from "next-auth/jwt";

export const GET = async (request: any): Promise<Response> => {
  try {
    await connectDB();
    const token = await getToken({ req: request });
    if (!token) {
      return new Response("Not logged", { status: 401 });
    }
    const email = token.email;
    const userFound = await User.findOne({ email: email });
    const seenMovies = userFound.seenMovies;
    return new Response(
      JSON.stringify({ seenMoviesAmount: seenMovies.length }),
      { status: 200 }
    );
  } catch (error) {
    //console.error("Error getting random movie:", error);
    return new Response("Error getting random movie", { status: 500 });
  }
};
