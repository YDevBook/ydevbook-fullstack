import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfilePage =
        nextUrl.pathname.startsWith('/profile-form') ||
        nextUrl.pathname.startsWith('/my-profile');
      if (isOnProfilePage) {
        if (isLoggedIn) return true; // 프로필 페이지에서 로그인이 되어있으면 그대로 있기
        return Response.redirect(new URL('/login', nextUrl.origin)); // 프로필 페이지에서 로그인이 안되어있으면 로그인 페이지로 리다이렉트
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session.profileImageUrl) {
        token.picture = session.profileImageUrl;
        return token;
      }
      if (user) {
        token.id = user.id;
        token.picture = user.profileImageUrl;
        token.isStartup = user.isStartup;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string,
        profileImageUrl: (token.picture as string) || undefined,
        isStartup: (token.isStartup as boolean) || undefined
      };
      return session;
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
