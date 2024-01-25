import { auth } from '@/auth';
import { uploadFile } from '@/lib/gcsBucket';
import { sql } from '@vercel/postgres';
import path from 'path';

export interface CustomErrorObject {
  message: string;
  status: number;
}

export async function attachmentFileUpload(file: File) {
  try {
    const session = await auth();
    if (!session?.user) {
      return 'User not logged In';
    }
    const { id: userId } = session?.user;
    const timeString = new Date().toUTCString();
    const gcsResponse = await uploadFile(
      file,
      path.join('attachment-files', `${userId}_${timeString}`)
    );
    const mediaLink = gcsResponse[0].metadata.mediaLink;
    console.log(gcsResponse[0].metadata.mediaLink);
    const query = `INSERT INTO files ("userId", "fileName", "mediaLink") VALUES ($1, $2, $3)`;
    const insertResult = await sql.query(query, [userId, file.name, mediaLink]);
    if (insertResult.rowCount === 0) {
      throw new Error('Something went wrong.');
    } else {
      return 'success';
    }
  } catch (error) {
    throw error;
  }
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file') as File;

  try {
    if (!file || !file.name || !file.type || !file.size) {
      throw { message: '잘못된 파일입니다.', status: 400 } as CustomErrorObject;
    }

    const responseData = await attachmentFileUpload(file);

    if (!responseData) {
      throw {
        message: '파일 업로드에 실패했습니다.',
        status: 400
      } as CustomErrorObject;
    }

    if (responseData === 'User not logged In') {
      throw {
        message: '로그인이 필요합니다.',
        status: 400
      } as CustomErrorObject;
    }

    if (responseData === 'success') {
      return new Response('파일이 업로드 되었습니다.', { status: 200 });
    }
  } catch (error: unknown) {
    console.error(error);
    if (!!(error as any).status && (error as any).status === 400) {
      const errorObject = error as CustomErrorObject;
      return new Response(errorObject.message, { status: errorObject.status });
    }

    return new Response('일시적인 오류가 발생했습니다.', { status: 500 });
  }
}
