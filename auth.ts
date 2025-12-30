import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Check if auth is enabled
const isAuthEnabled = process.env.AUTH_ENABLED === "true";

// Get allowed emails from environment variable (comma-separated)
const allowedEmails = process.env.ALLOWED_EMAILS?.split(',').map(e => e.trim()) || [];

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: isAuthEnabled
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        }),
      ]
    : [],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user }) {
      // If no allowed emails are configured, allow all users
      if (allowedEmails.length === 0) {
        return true;
      }

      // Check if user's email is in the allowed list
      if (user.email && allowedEmails.includes(user.email)) {
        return true;
      }

      // Reject the sign-in
      return false;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
});

// Helper to check if auth is enabled
export { isAuthEnabled };
