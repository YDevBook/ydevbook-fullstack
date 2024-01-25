import { attachmentFileUpload } from '@/app/api/file/lib';

export interface CustomErrorObject {
  message: string;
  status: number;
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
