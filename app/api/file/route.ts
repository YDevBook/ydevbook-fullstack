import { NextResponse } from 'next/server';
import { attachmentFileUpload, profileImageUpload } from '@/app/api/file/lib';

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
    return NextResponse.json(
      { message: '잘못된 요청입니다.' },
      { status: 400 }
    );
  }

  try {
    const formData = await request.formData();

    const file = formData.get('file') as File;
    if (!file || !file.name || !file.type || !file.size) {
      return NextResponse.json({ message: '잘못된 파일입니다.', status: 400 });
    }

    if (uploadType === UploadType.ProfileImage) {
      const response = await profileImageUpload(file);

      if (response.status === 401) {
        return NextResponse.json({
          message: '로그인이 필요합니다.',
          status: 401
        });
      }

      if (response.status === 200) {
        return NextResponse.json(
          { profileImageUrl: response.profileImageUrl },
          { status: 200 }
        );
      }

      return NextResponse.json({
        message: '프로필 이미지 업로드에 실패했습니다.',
        status: response.status
      });
    } else if (uploadType === UploadType.AttachmentFile) {
      const response = await attachmentFileUpload(file);
      if (response.status === 401) {
        return NextResponse.json({
          message: '로그인이 필요합니다.',
          status: 401
        });
      }

      if (response.status === 200) {
        return NextResponse.json(
          { message: '파일이 업로드 되었습니다.' },
          { status: 200 }
        );
      }

      return NextResponse.json({
        message: '파일 업로드에 실패했습니다.',
        status: response.status
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      status: 500
    });
  }
}
