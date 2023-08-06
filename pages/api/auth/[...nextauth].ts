import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    //@ts-ignore
    async jwt(
      token: any,
      user: any,
      account: any,
      profile: any,
      isNewUser: any
      ) {
        
      // Puedes personalizar el token JWT aquí si lo deseas
      return token;
    },

    //@ts-ignore
    async session(session: any, token: any) {
      session.accessToken = token
      // Puedes personalizar la sesión de usuario aquí si lo deseas
      return session;
    },
  },
});
