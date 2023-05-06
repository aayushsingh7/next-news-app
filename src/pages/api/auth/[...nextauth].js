import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "@/database/dbConnection";
import User from "@/database/models/userModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req ) {
        dbConnect().catch((err) => console.log(err));
        const isUserExists = await User.findOne({ email: credentials.email });
        if (!isUserExists) {
         throw new Error("No user found")
        }
        const checkPassword = await bcryptjs.compare(
          credentials.password,
          isUserExists.password
        );
        if (!checkPassword || isUserExists.email !== credentials.email) {
          throw new Error("Invalid credentials")
        }
        return isUserExists;
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      await dbConnect()
        .then(() => console.log("Database Connected"))
        .catch((err) => console.log(err));
      const isUserExists = await User.findOne({ email: user.user.email });
      if (!isUserExists) {
      //  return false
      throw new Error("User not found")
      } else {
        return true;
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/register'
  },
  callbackUrl: "https://famous-strudel-cd5544.netlify.app/api/auth/callback",
});

// export default NextAuth({ providers: [ Providers.Google({ clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET, }), ], callbacks: { async signIn(user, account, profile) {
//     // Connect to the database
//      const { db } = await connectToDatabase()
//       // Find the user by their email
//       const existingUser = await db.collection(“users”).findOne({ email: user.email }) // If the user exists, allow sign in
//       if (existingUser) { return true } // If the user does not exist, decline sign in
//       else { return false } }, }, })
