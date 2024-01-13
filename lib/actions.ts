'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { name, email, password, repeatPassword } =
      Object.fromEntries(formData);

    if (password !== repeatPassword) {
      return 'Passwords do not match.';
    }

    const result = await sql`
      SELECT COUNT(*) FROM users WHERE email=${email as string}`;
    if (result.rows[0].count !== '0') {
      return 'Email already in use.';
    }

    const hashedPassword = await bcrypt.hash(password as string, 10);
    const insertResult = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name as string}, ${email as string}, ${hashedPassword})
    `;
    if (insertResult.rowCount === 0) {
      return 'Something went wrong.';
    } else {
      redirect('/login');
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
