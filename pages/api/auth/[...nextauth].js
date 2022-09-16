import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import dbConnect from "../../../lib/mongo";
import { getUserByEmail } from "../../../lib/user/user.model";
import { verifyPasword } from "../../../lib/passwordEncrypt";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 5,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();

        let user;
        try {
          user = await getUserByEmail(credentials.email);
        } catch (err) {
          console.log(err.message);
          if (!user) {
            throw new Error("Could not look up your details. please try again");
          }
        }

        if (!user) {
          throw new Error("Invalid username or password");
        }

        const passwordIsValid = await verifyPasword(
          credentials.password,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error("invalid username or password");
        }

        return { email: user._id, name: user.name };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRETS,
    }),
  ],
});
