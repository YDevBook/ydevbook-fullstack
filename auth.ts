import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const user = await getUser(parsedCredentials.data.email);
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
    })
    // GitHub({
    //   clientId: process.env.GITHUB_OAUTH_CLIENT_KEY as string,
    //   clientSecret: process.env.GITHUB_OAUTH_CLIENT_SECRET as string
    // })
  ],
  pages: {
    signIn: '/login'
  }
});
