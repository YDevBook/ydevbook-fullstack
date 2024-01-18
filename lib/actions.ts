'use server';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { ProfileFormData } from '@/lib/definitions';

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

function reduceToArrayString(arr: string[]) {
  if (arr.length === 0) return '{}';
  return `{${arr.reduce((acc, curr) => `${acc}'${curr}', `, '').slice(0, -2)}}`;
}

export async function insertProfile(data: ProfileFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    console.log(session?.user.id);
    const userId = session?.user.id;
    const email = session?.user.email;
    const {
      phoneNumber,
      dateOfBirth,
      address,
      positions,
      skills,
      school,
      major,
      graduateStatus,
      githubLink
    } = data;
    const positionsInsertArray = reduceToArrayString(positions || []);
    const skillsInsertArray = reduceToArrayString(skills || []);
    const query = `
    INSERT INTO profiles (userId, email, phoneNumber, dateOfBirth, address, positions, skills, school, major, graduateStatus, githubLink)
    VALUES (${userId}, ${email}, ${phoneNumber}, ${dateOfBirth || undefined}, ${
      address || undefined
    }, ${positionsInsertArray}, ${skillsInsertArray}, ${school || undefined}, ${
      major || undefined
    }, ${graduateStatus || undefined}, ${githubLink || undefined})
  `;
    const insertResult = await sql`
      INSERT INTO profiles (userId, email, phoneNumber, dateOfBirth, address, positions, skills, school, major, graduateStatus, githubLink)
      VALUES (${userId}, ${email}, ${phoneNumber}, ${
        dateOfBirth || undefined
      }, ${
        address || undefined
      }, ${positionsInsertArray}, ${skillsInsertArray}, ${
        school || undefined
      }, ${major || undefined}, ${graduateStatus || undefined}, ${
        githubLink || undefined
      })
    `;
    if (insertResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return 'success';
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('oneofeachuser')) {
        return 'Profile already exists';
      }
    }
    throw error;
  }
}
