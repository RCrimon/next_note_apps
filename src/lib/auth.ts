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
          throw new Error('all fields must be filled up');
        }

        await connectDb();
        let user = await User.findOne({ email });
        if (!user || !user.password) { // 👈 Google user jodi password chada thake
          throw new Error('user cannot be matched');
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('user cannot be matched');
        }

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
        try {
          await connectDb();
          let existUser = await User.findOne({ email: user.email });
          if (!existUser) {
            existUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              // password field blank thakbe google sign-in er jonno
            });
          }
          user.id = existUser._id.toString();
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Error hole direct false hobe, jate crash na hoy
        }
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
  // 👇 STRICT SECURITY: Vercel node proxy and secure cookie mismatch handling
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
      },
    },
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