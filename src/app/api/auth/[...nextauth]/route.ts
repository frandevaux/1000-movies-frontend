import { connectDB } from "@/libs/mongodb";
import User from "@/models/user.model";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB();
        const userFound = await User.findOne({
          email: credentials?.email,
        }).select("+password");
        if (!userFound) {
          throw new Error("User not found");
        }

        const passwordMatch = bcrypt.compare(
          credentials!.password,
          userFound.password
        );
        if (!passwordMatch) {
          throw new Error("Password not match");
        }
        //remove password from user
        userFound.password = undefined;
        return userFound;
      },
    }),
  ],
  callbacks: {
    jwt({ account, token, user, profile, session }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
