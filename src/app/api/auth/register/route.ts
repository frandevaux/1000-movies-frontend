import { createAccessToken } from "@/libs/jwt";
import { connectDB } from "@/libs/mongodb";
import { User } from "@/models/user.model";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export const POST = async (request: Request): Promise<Response> => {
  await connectDB();
  const { email, password, name, seenMovies } = await request.json();
  const cookieStore = cookies();
  let userFound;
  let newUser;

  try {
    userFound = await User.findOne({ email });
    if (userFound) {
      return new Response("Email already exists", { status: 409 });
    }
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);

      newUser = new User({
        name,
        email,
        password: passwordHash,
        seenMovies: seenMovies || [],
      });
    } else {
      newUser = new User({
        name,
        email,
        seenMovies: seenMovies || [],
      });
    }

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    if (token) {
      cookieStore.set("token", token.toString());
    }

    return new Response(JSON.stringify(userSaved), { status: 201 });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
