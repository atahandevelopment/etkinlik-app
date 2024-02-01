import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { GetMe, LoginService } from "@/services/auth";
import { jwtDecode } from "jwt-decode";

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "text", placeholder: "Password" },
      },

      async authorize(credentials) {
        const user = await LoginService(credentials);
        if (!user) {
          throw new Error("User not found");
        }
        
        const accessToken = user.data.data.access;
        const refreshToken = user.data.data.refresh;
        const decoded = await jwtDecode(accessToken);
        const userId = decoded.id;
        const getUser = await GetMe(userId);
        const currentUser = getUser.data.data;

       if(!currentUser) {
        throw new Error("User not found");
       } else {
        return {
          ...currentUser,
          accessToken,
          refreshToken,
        };
       }
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect(url, baseUrl) {
      return `http://localhost:4000`;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token._id = user._id;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.role = token.role;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 10,
  },
  session: {
    strategy: "jwt",
    maxAge: 720,
    cookie: {
      maxAge: 720,
    },
  },

  secret: process.env.REFRESH_TOKEN_SECRET,
  secret: process.env.ACCESS_TOKEN_SECRET,

};
export default NextAuth(authOptions);
