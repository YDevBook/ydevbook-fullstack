import { auth } from '@/auth';
import FileAttachInput from '@/components/molecules/FileAttachInput';
import ExperiencesCard from '@/components/organisms/ExperiencesCard';
import { AttachmentFiles, Experience, Profile } from '@/lib/definitions';
import { Badge, Card, Text, Title, Button } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import Image from 'next/image';

export default async function MyProfilePage() {
  noStore();
  const session = await auth();
  if (session?.user.isStartup) {
    redirect('/startup/my-info');
  }
  let profile = {} as Profile;
  let experiences = [] as Experience[];
  let attachedFiles = [] as AttachmentFiles[];

  try {
    const profilePromise = sql.query<Profile>(
      `
      SELECT * FROM profiles WHERE "userId" = $1;`,
      [session?.user.id]
    );
    const experiencesPromise = sql.query<Experience>(
      `
      SELECT * FROM experiences WHERE "userId" = $1;`,
      [session?.user.id]
    );
    const attachedFilesPromise = sql.query<AttachmentFiles>(
      `
        SELECT id, "fileName", "mediaLink" FROM files WHERE "userId" = $1;
      `,
      [session?.user.id]
    );

    const [
      profileQueryResults,
      experiencesQueryResults,
      attachedFilesQueryResults
    ] = await Promise.all([
      profilePromise,
      experiencesPromise,
      attachedFilesPromise
    ]);

    if (profileQueryResults.rows.length === 0) {
      redirect('/profile-form');
    }
    profile = profileQueryResults.rows[0];
    experiences = experiencesQueryResults.rows;
    attachedFiles = attachedFilesQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  if (!profile.id) {
    redirect('/profile-form');
  }

  const {
    name,
    phoneNumber,
    email,
    dateOfBirth,
    sex,
    address,
    positions,
    skills,
    school,
    major,
    graduateStatus,
    personalStatement,
    githubLink,
    webLink
  } = profile;

  return (
    <main className="p-4 mx-auto md:p-10 max-w-7xl">
      <Title className="my-4">내 프로필</Title>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:basis-1/3">
          <Card className="relative w-full mx-auto">
            <div className="relative">
              <div className="relative inline-block">
                <Image
                  src={session?.user.profileImageUrl || DefaultProfileImage}
                  alt="프로필 이미지"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <Link href="/my-profile/edit">
              <Button className="absolute top-0 right-0 m-4">수정하기</Button>
            </Link>
            <Text>이름</Text>
            <Title>{name}</Title>
            <Text>전화번호</Text>
            <Title>{phoneNumber}</Title>
            <Text>이메일</Text>
            <Title>{email}</Title>
            <Text>생년월일</Text>
            <Title>
              {dateOfBirth?.toDateString() ||
                '생년월일 정보를 업데이트 해주세요.'}
            </Title>
            <Text>성별</Text>
            <Title>{sex}</Title>
            <Text>거주 지역</Text>
            <Title>{address}</Title>
            <Text>학력</Text>
            <Title>{school}</Title>
            <Text>전공</Text>
            <Title>{major}</Title>
            <Title>{graduateStatus}</Title>
            <Text>깃헙 링크</Text>
            <Title>{githubLink || '깃헙 페이지 링크를 등록해주세요.'}</Title>
            <Text>웹 링크</Text>
            <Title>{webLink || '웹 페이지 링크를 등록해주세요.'}</Title>
          </Card>
        </div>
        <div className="mt-4 sm:basis-2/3 sm:ml-4 sm:mt-0">
          <Card className="w-full mx-auto">
            <Link href="/my-profile/edit-position-and-skills">
              <Button className="absolute top-0 right-0 m-4">수정하기</Button>
            </Link>
            <Title>구직중인 포지션</Title>
            <div className="my-2">
              {positions?.map((position) => (
                <Badge size="xl" color="slate" className="mx-1 " key={position}>
                  {position}
                </Badge>
              ))}
            </div>
            <Title>보유 기술</Title>
            <div className="my-2">
              {skills?.map((skill) => (
                <Badge size="xl" color="slate" className="mx-1 " key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
          <ExperiencesCard experiences={experiences} />
          <Card className="w-full mx-auto mt-4">
            <Link href="/my-profile/edit-text?column=personalStatement">
              <Button className="absolute top-0 right-0 m-4">수정하기</Button>
            </Link>
            <Title>자기 소개</Title>
            <Text className="whitespace-pre-line">
              {personalStatement || '자기 소개 글을 등록해주세요.'}
            </Text>
          </Card>
          <Card className="w-full mx-auto mt-4">
            <Title>첨부 자료</Title>
            <Text>
              첨부한 파일을 클릭하면 다운로드가 가능합니다. 파일을 추가하려면
              아래의 버튼을 눌러주세요.
            </Text>
            {attachedFiles.map((file) => (
              <div key={file.id}>
                <a href={file.mediaLink} download={file.fileName}>
                  {file.fileName}
                </a>
              </div>
            ))}
            <FileAttachInput />
          </Card>
        </div>
      </div>
    </main>
  );
}
