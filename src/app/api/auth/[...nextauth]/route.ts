import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TEMP: mock login (replace with DB later)
        if (
          credentials?.email === "chanakya.sharma@gmail.com" &&
          credentials?.password === "chaku@123"
        ) {
          return {
            id: "1",
            name: "Chanakya Sharma",
            email: "chanakya.sharma@gmail.com",
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
