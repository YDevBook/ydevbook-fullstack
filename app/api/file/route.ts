import { attachmentFileUpload, profileImageUpload } from '@/app/api/file/lib';
import { NextResponse } from 'next/server';

export interface CustomErrorObject {
  message: string;
  status: number;
}

enum UploadType {
  ProfileImage = 'profile-image',
  AttachmentFile = 'attachment-file'
}

export async function POST(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const uploadType = searchParams.get('upload-type');
  if (
    uploadType !== UploadType.ProfileImage &&
    uploadType !== UploadType.AttachmentFile
  ) {
    throw { message: '잘못된 요청입니다.', status: 400 } as CustomErrorObject;
  }
  const formData = await request.formData();

  const file = formData.get('file') as File;

  try {
    if (!file || !file.name || !file.type || !file.size) {
      throw { message: '잘못된 파일입니다.', status: 400 } as CustomErrorObject;
    }

    if (uploadType === UploadType.ProfileImage) {
      const responseData = await profileImageUpload(file);
      if (!responseData) {
        throw {
          message: '이미지 업로드에 실패했습니다.',
          status: 400
        } as CustomErrorObject;
      }

      if (responseData.status === 401) {
        throw {
          message: '로그인이 필요합니다.',
          status: 401
        } as CustomErrorObject;
      }

      if (responseData.status === 200) {
        return NextResponse.json(
          { profileImageUrl: responseData.profileImageUrl },
          { status: 200 }
        );
      }
    } else if (uploadType === UploadType.AttachmentFile) {
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
