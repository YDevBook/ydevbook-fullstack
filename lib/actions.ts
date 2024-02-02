'use server';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import {
  ExperienceFormData,
  ExperienceUpdateFormData,
  ProfileFormData,
  ProfilePositionAndSkillsUpdateFormData,
  ProfileUpdateFormData
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
    } = removeEmptyString(data);
    const query = `
  INSERT INTO profiles ("userId", "name", "email", "phoneNumber", "dateOfBirth", "address", "positions", "skills", "school", "major", "graduateStatus", "githubLink")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `;
    await sql.query(query, [
      userId,
      name,
      email,
      phoneNumber,
      dateOfBirth,
      address,
      positions,
      skills,
      school,
      major,
      graduateStatus,
      githubLink
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
      sex,
      address,
      school,
      major,
      graduateStatus,
      githubLink,
      webLink
    } = removeEmptyString(data);
    const query = `
      UPDATE profiles
      SET "name" = $1,
      "email" = $2,
      "phoneNumber" = $3,
      "dateOfBirth" = $4,
      "sex" = $5,
      "address" = $6,
      "school" = $7,
      "major" = $8,
      "graduateStatus" = $9,
      "githubLink" = $10,
      "webLink" = $11
      WHERE "userId" = $12
    `;
    await sql.query(query, [
      name,
      email,
      phoneNumber,
      dateOfBirth,
      sex,
      address,
      school,
      major,
      graduateStatus,
      githubLink,
      webLink,
      userId
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
      description
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
      description
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
      description
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
      id
    ]);
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
