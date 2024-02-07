import { createUser, getUserByOauth } from '@/lib/userDB';
import type { NextAuthConfig } from 'next-auth';

const AuthRequiredStartsWith = ['/profile-form', '/my-profile', '/startup/'];

const AuthWhiteList = ['/startup', '/startup/signup', '/startup/login'];

export const authConfig = {
  pages: {
    signIn: '/login'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // Auth 필요 없는 페이지 일치하면 무조건 그대로 둠.
      for (const page of AuthWhiteList) {
        if (nextUrl.pathname === page) {
          return true;
        }
      }

      const isLoggedIn = !!auth?.user;
      const isStartup = auth?.user?.isStartup;
      const isEmployee = !!auth?.user && !isStartup;

      for (const page of AuthRequiredStartsWith) {
        if (nextUrl.pathname.startsWith(page)) {
          const isStartupAuthRequiredPage =
            nextUrl.pathname.startsWith('/startup/');
          if (!isStartupAuthRequiredPage && (!isLoggedIn || !isEmployee)) {
            return Response.redirect(
              new URL(
                `/login?callbackUrl=${nextUrl.toString()}`,
                nextUrl.origin
              )
            ); // 프로필 페이지에서 로그인이 안되어있으면 로그인 페이지로 리다이렉트
          }
          if (isStartupAuthRequiredPage && !isStartup) {
            return Response.redirect(
              new URL(
                `/startup/login?callbackUrl=${nextUrl.toString()}`,
                nextUrl.origin
              )
            ); // 스타트업 로그인 필요 페이지에서 스타트업 계정으로 로그인이 안되어있으면 스타트업 로그인 페이지로 리다이렉트
          }
        }
      }
      return true;
    },
    async jwt({ token, user, trigger, session, account }) {
      if (trigger === 'signIn' && account?.provider === 'kakao') {
        // 카카오 로그인 시 유저 id 를 DB users 테이블에서 조회 후 있으면 그걸로 로그인, 없으면 회원가입 로직 태움.
        const dbUser = await getUserByOauth(account.providerAccountId);
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.profileImageUrl;
          token.isStartup = dbUser.isStartup;
          return token;
        } else {
          // signUp
          const insertedUser = await createUser(
            account.providerAccountId,
            user.name || undefined,
            user.email || undefined
          );
          token.id = insertedUser.id;
          token.name = insertedUser.name;
          token.email = insertedUser.email;
          token.picture = insertedUser.profileImageUrl;
          token.isStartup = insertedUser.isStartup;
          return token;
        }
      }
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
