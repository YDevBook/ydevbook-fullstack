import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      if (isOnLoginPage) {
        if (!isLoggedIn) return true; // 로그인 페이지에서 로그인이 안되어있으면 그대로 있기
        return Response.redirect(new URL('/', nextUrl.origin)); // 로그인 페이지에서 로그인이 되어있으면 홈으로 리다이렉트 (callBackUrl 에 따라 로직 추가 필요)
      } else {
        // 로그인 페이지가 아니면 (페이지에 따라 다른 로직 구성 필요)
        const isOnProfilePage = nextUrl.pathname.startsWith('/profile-form');
        if (isOnProfilePage) {
          if (isLoggedIn) return true; // 프로필 페이지에서 로그인이 되어있으면 그대로 있기
          return Response.redirect(new URL('/login', nextUrl.origin)); // 프로필 페이지에서 로그인이 안되어있으면 로그인 페이지로 리다이렉트
        }
        return true;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        email: token.email as string
      };
      return session;
    }
  },
  providers: [] // Add providers with an empty array for now
} satisfies NextAuthConfig;
