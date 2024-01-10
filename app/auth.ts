import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string
    })
  ],
  pages: {
    signIn: '/login'
  }
});
