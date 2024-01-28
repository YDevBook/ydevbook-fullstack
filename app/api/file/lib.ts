import { auth } from '@/auth';
import { streamFileUpload } from '@/lib/gcsBucket';
import { sql } from '@vercel/postgres';
import path from 'path';

export async function attachmentFileUpload(file: File) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    const { id: userId } = session?.user;
    const timeString = new Date().toUTCString();
    const gcsResponse = await streamFileUpload(
      file,
      path.join('attachment-files', userId, timeString)
    );
    const mediaLink = gcsResponse.metadata.mediaLink;
    const query = `INSERT INTO files ("userId", "fileName", "mediaLink") VALUES ($1, $2, $3)`;
    const insertResult = await sql.query(query, [userId, file.name, mediaLink]);
    if (insertResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return 'success';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function profileImageUpload(file: File) {
  try {
    const session = await auth();
    if (!session?.user) {
      return { message: 'User not logged In', status: 401 };
    }
    const { id: userId } = session?.user;
    const gcsResponse = await streamFileUpload(
      file,
      path.join('profile-images', `${userId}`)
    );
    const profileImageUrl = gcsResponse.publicUrl();
    const query = `UPDATE users SET "profileImageUrl" = $1 WHERE id = $2`;
    const insertResult = await sql.query(query, [profileImageUrl, userId]);
    if (insertResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return { message: 'success', profileImageUrl, status: 200 };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
