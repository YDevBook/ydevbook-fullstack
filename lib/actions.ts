'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import { auth, signIn } from '@/auth';
import {
  ExperienceFormData,
  ExperienceUpdateFormData,
  ProfileFormData,
  ProfilePositionAndSkillsUpdateFormData,
  ProfileShortIntroUpdateFormData,
  ProfileUpdateFormData,
} from '@/lib/definitions';

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

export async function startupAccountAuthenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // console.log('startupAccountAuthenticate formData', formData);
    await signIn('startupCredentials', formData);
  } catch (error) {
    // console.error(error);
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

// Deprecated
// SQL Injection Vulnerable
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeEmptyString = <T extends Record<string, any>>(obj: T): T => {
  const returnObj = {} as T;
  for (const [key, value] of Object.entries(obj)) {
    if (value !== '') {
      returnObj[key as keyof T] = value;
    }
  }
  return returnObj;
};

export async function insertProfile(data: ProfileFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const {
      name,
      phoneNumber,
      email,
      positions,
      skills,
      school,
      major,
      graduateStatus,
      shortBio,
      introductionKeywords,
    } = removeEmptyString(data);
    const query = `
  INSERT INTO profiles ("userId", "name", "email", "phoneNumber", "positions", "skills", "school", "major", "graduateStatus", "shortBio", "introductionKeywords")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  `;
    await sql.query(query, [
      userId,
      name,
      email,
      phoneNumber,
      positions,
      skills,
      school,
      major,
      graduateStatus,
      shortBio,
      introductionKeywords,
    ]);
    return { status: 200 };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('oneofeachuser')) {
        return { status: 409 };
      }
    }
    console.error(error);
    throw new Error('Something went wrong.');
  }
}

export async function updateProfile(data: ProfileUpdateFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const {
      name,
      email,
      phoneNumber,
      dateOfBirth,
      address,
      school,
      major,
      graduateStatus,
      githubLink,
      webLink,
      contractPreference,
    } = removeEmptyString(data);
    const query = `
      UPDATE profiles
      SET "name" = $1,
      "email" = $2,
      "phoneNumber" = $3,
      "dateOfBirth" = $4,
      "address" = $5,
      "school" = $6,
      "major" = $7,
      "graduateStatus" = $8,
      "githubLink" = $9,
      "webLink" = $10,
      "contractPreference" = $11
      WHERE "userId" = $12
    `;
    await sql.query(query, [
      name,
      email,
      phoneNumber,
      dateOfBirth,
      address,
      school,
      major,
      graduateStatus,
      githubLink,
      webLink,
      contractPreference,
      userId,
    ]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function updateProfileText(
  formData: FormData,
  columnName: string
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    // Now only personalStatement is used. (20240309)
    if (columnName !== 'personalStatement') {
      return { status: 400 };
    }
    const { id: userId } = session?.user;
    const data = Object.fromEntries(formData);
    const value = data[columnName];

    if (typeof value !== 'string') {
      return { status: 400 };
    }

    const query = `
      UPDATE profiles
      SET "${columnName}" = $1
      WHERE "userId" = $2
    `;
    await sql.query(query, [value, userId]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function updateProfilePositionAndSkills(
  data: ProfilePositionAndSkillsUpdateFormData
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const { positions, skills } = data;
    const query = `
      UPDATE profiles
      SET "positions" = $1,
      "skills" = $2
      WHERE "userId" = $3
    `;
    await sql.query(query, [positions, skills, userId]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function updateProfileShortIntro(
  data: ProfileShortIntroUpdateFormData
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const { shortBio, introductionKeywords } = data;
    const query = `
      UPDATE profiles
      SET "shortBio" = $1, "introductionKeywords" = $2
      WHERE "userId" = $3
    `;
    await sql.query(query, [shortBio, introductionKeywords, userId]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function insertExperience(data: ExperienceFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const {
      companyName,
      position,
      startDate,
      endDate,
      isWorkingNow,
      skills,
      description,
    } = removeEmptyString(data);
    const query = `INSERT INTO experiences ("userId", "companyName", "position", "startDate", "endDate", "isWorkingNow", "skills", "description")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    await sql.query(query, [
      userId,
      companyName,
      position,
      startDate,
      !isWorkingNow ? endDate || undefined : undefined,
      isWorkingNow,
      skills,
      description,
    ]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function updateExperience(data: ExperienceUpdateFormData) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const {
      id,
      companyName,
      position,
      startDate,
      endDate,
      isWorkingNow,
      skills,
      description,
    } = removeEmptyString(data);
    const query = `UPDATE experiences
      SET "companyName" = $1,
      "position" = $2,
      "startDate" = $3,
      "endDate" = $4,
      "isWorkingNow" = $5,
      "skills" = $6,
      "description" = $7
      WHERE "userId" = $8 AND "id" = $9`;
    await sql.query(query, [
      companyName,
      position,
      startDate,
      !isWorkingNow ? endDate || undefined : undefined,
      isWorkingNow,
      skills,
      description,
      userId,
      id,
    ]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function deleteExperience(id: number) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const query = `DELETE FROM experiences WHERE "userId" = $1 AND "id" = $2`;
    await sql.query(query, [userId, id]);
    return { status: 200 };
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong.');
  }
}

export async function deleteAttachmentFile(id: number) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { status: 401 };
    }
    const { id: userId } = session?.user;
    const query = `DELETE FROM files WHERE "userId" = $1 AND "id" = $2`;
    const deleteResult = await sql.query(query, [userId, id]);
    if (deleteResult.rowCount === 0) {
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

    throw new Error('Something went wrong.');
  }
}
