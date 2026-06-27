import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDb from "./bd";
import { User } from "../model/user.model";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email log in',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;
        if (!email || !password) {
          throw new Error('all fields must be filled up'); // Error tracking format thik kora holo
        }

        await connectDb();
        let user = await User.findOne({email});
        if (!user) {
          throw new Error('user cannot be matched');
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('user cannot be matched');
        }

        // Return object-er sathe user ID pass hocche
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image
        };
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === 'google') {
        await connectDb();
        let existUser = await User.findOne({ email: user.email });
        if (!existUser) {
          existUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image
          });
        }
        // FIX: User thakuk ba na thakuk, database ID-ta oboshshoi pass korte hobe
        user.id = existUser._id.toString();
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
};