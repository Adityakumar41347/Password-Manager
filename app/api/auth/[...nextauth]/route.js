import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '@/db/connectDB';
import { User } from '@/models/User'; // ✅ You forgot this import

const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'github') {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            username: user.email.split('@')[0],
          });
          await newUser.save();
        }
      }
      return true;
    },

    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };