import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUserByCredentials } from '@/lib/userDB';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      id: 'credentials',
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            isStartup: z.enum(['true', 'false'])
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const user = await getUserByCredentials(
            parsedCredentials.data.email,
            parsedCredentials.data.isStartup === 'true'
          );
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(
            parsedCredentials.data.password,
            user.password
          );
          if (passwordsMatch) return user;
        }

        console.log('Invalid Credentials');
        return null;
      }
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.KAKAO_OAUTH_CLIENT_SECRET as string
    })
    // 스타트업 용 Provider 따로 구현하였으나 next-auth Package 에 버그가 있는 걸로 나와서 일단 주석처리
    // 위 Credentials Provider 에서 조건부 처리로 대체
    // 관련 Github Issue Page: https://github.com/nextauthjs/next-auth/issues/9673
    // Credentials({
    //   id: 'startupCredentials',
    //   name: 'Startup Credentials',
    //   async authorize(credentials) {
    //     console.log('Startup Credentials', credentials);
    //     const parsedCredentials = z
    //       .object({
    //         email: z.string().email(),
    //         password: z.string().min(6)
    //       })
    //       .safeParse(credentials);
    //     if (parsedCredentials.success) {
    //       const user = await getUser(parsedCredentials.data.email, true);
    //       if (!user) return null;
    //       const passwordsMatch = await bcrypt.compare(
    //         parsedCredentials.data.password,
    //         user.password
    //       );
    //       if (passwordsMatch) return user;
    //     }

    //     console.log('Invalid Credentials');
    //     return null;
    //   }
    // })

    // OAuth 나중에
    // GitHub({
    //   clientId: process.env.GITHUB_OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string
    // })
  ],
  pages: {
    signIn: '/login'
  }
});
