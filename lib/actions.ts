'use server';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { ProfileFormData, ProfileUpdateFormData } from '@/lib/definitions';

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
  return `{${arr.join(',')}}`;
}

export async function insertProfile(data: ProfileFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    const { id: userId, email, name } = session?.user;
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
    INSERT INTO profiles ("userId", "name", "email", "phoneNumber", "dateOfBirth", "address", "positions", "skills", "school", "major", "graduateStatus", "githubLink")
    VALUES (${userId}, ${name}, ${email}, ${phoneNumber}, ${
      dateOfBirth || undefined
    }, ${
      address || undefined
    }, ${positionsInsertArray}, ${skillsInsertArray}, ${school || undefined}, ${
      major || undefined
    }, ${graduateStatus || undefined}, ${githubLink || undefined})
  `;
    const insertResult = await sql`
      INSERT INTO profiles ("userId", "name", "email", "phoneNumber", "dateOfBirth", "address", "positions", "skills", "school", "major", "graduateStatus", "githubLink")
      VALUES (${userId}, ${name}, ${email}, ${phoneNumber}, ${
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

export async function updateProfile(data: ProfileUpdateFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    const { id: userId } = session?.user;
    const {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      sex,
      address,
      positions,
      skills,
      school,
      major,
      graduateStatus,
      githubLink,
      webLink
    } = data;
    const query = `
    UPDATE profiles
    SET "name" = $1,
    "email" = $2,
    "phoneNumber" = $3,
    "dateOfBirth" = $4,
    "sex" = $5,
    "address" = $6,
    "positions" = $7,
    "skills" = $8,
    "school" = $9,
    "major" = $10,
    "graduateStatus" = $11,
    "githubLink" = $12,
    "webLink" = $13
    WHERE "userId" = $14
  `;
    const updateResult = await sql.query(query, [
      name,
      email,
      phoneNumber,
      dateOfBirth || undefined,
      sex || undefined,
      address || undefined,
      positions || undefined,
      skills || undefined,
      school || undefined,
      major || undefined,
      graduateStatus || undefined,
      githubLink || undefined,
      webLink || undefined,
      userId
    ]);
    if (updateResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return 'success';
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      // if (error.message.includes('oneofeachuser')) {
      //   return 'Profile already exists';
      // }
    }
    throw error;
  }
}

export async function updateProfileText(
  formData: FormData,
  columnName: string
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    const { id: userId } = session?.user;
    const data = Object.fromEntries(formData);
    const value = data[columnName];

    if (typeof value !== 'string') {
      throw new Error('Wrong Access');
    }

    const query = `
    UPDATE profiles
    SET "${columnName}" = $1
    WHERE "userId" = $2
  `;
    const updateResult = await sql.query(query, [value, userId]);
    if (updateResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return 'success';
    }
  } catch (error) {
    if (error instanceof Error) {
      // if (error.message.includes('oneofeachuser')) {
      //   return 'Profile already exists';
      // }
    }
    throw error;
  }
}
