import { Badge, Button, Card, Text, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { auth } from '@/auth';
import FileDeleteButton from '@/components/atoms/FileDeleteButton';
import ActivelyJobSeekingSwitchCard from '@/components/molecules/ActivelyJobSeekingSwitchCard';
import FileAttachInput from '@/components/molecules/FileAttachInput';
import ExperiencesCard from '@/components/organisms/ExperiencesCard';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import {
  AttachmentFiles,
  Experience,
  GraduateStatusOptions,
  Profile,
} from '@/lib/definitions';

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
      attachedFilesQueryResults,
    ] = await Promise.all([
      profilePromise,
      experiencesPromise,
      attachedFilesPromise,
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
    redirect('/profile-form?stage=포지션');
  }

  const {
    name,
    phoneNumber,
    email,
    dateOfBirth,
    address,
    positions,
    skills,
    school,
    major,
    graduateStatus,
    personalStatement,
    shortBio,
    githubLink,
    webLink,
    isActivelySeeking,
    introductionKeywords,
  } = profile;

  const onClickJobSeekingSwitch = async (isActive: boolean) => {
    'use server';
    try {
      await sql.query(
        `
        UPDATE profiles
        SET "isActivelySeeking" = $1
        WHERE "userId" = $2;
      `,
        [isActive, session?.user.id]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onClickFileDelete = async (fileId: number) => {
    'use server';
    try {
      await sql.query(
        `
        DELETE FROM files WHERE id = $1;
      `,
        [fileId]
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <MainPageTemplate>
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
            <Text>거주 지역</Text>
            <Title>{address || '거주 지역 정보를 업데이트 해주세요.'}</Title>
            <Text>학력</Text>
            <Title>{school}</Title>
            <Text>전공</Text>
            <Title>
              {major}(
              {
                GraduateStatusOptions.find(
                  (option) => option.value === graduateStatus
                )?.label
              }
              )
            </Title>
            <Title></Title>
            <Text>깃헙 링크</Text>
            <Title>{githubLink || '깃헙 페이지 링크를 등록해주세요.'}</Title>
            <Text>웹 링크</Text>
            <Title>{webLink || '웹 페이지 링크를 등록해주세요.'}</Title>
          </Card>
          <ActivelyJobSeekingSwitchCard
            initialIsActive={isActivelySeeking}
            onChange={onClickJobSeekingSwitch}
          />
        </div>
        <div className="mt-4 sm:basis-2/3 sm:ml-4 sm:mt-0">
          <Card className="w-full mx-auto">
            <Link href="/my-profile/edit-short-intro">
              <Button className="absolute top-0 right-0 m-4">수정하기</Button>
            </Link>
            <Title>한줄 소개</Title>
            <Text className="whitespace-pre-line">
              {shortBio || '짧은 한 줄로 본인을 표현해보세요.'}
            </Text>
            <div className="my-2">
              {introductionKeywords?.map((position) => (
                <Badge className="mx-1" key={position}>
                  {position}
                </Badge>
              ))}
            </div>
          </Card>
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
            <Link href="/my-profile/edit-position-and-skills">
              <Button className="absolute top-0 right-0 m-4">수정하기</Button>
            </Link>
            <Title>구직중인 포지션</Title>
            <div className="my-2">
              {positions?.map((position) => (
                <Badge className="mx-1" key={position}>
                  {position}
                </Badge>
              ))}
            </div>
            <Title>보유 기술</Title>
            <div className="my-2">
              {skills?.map((skill) => (
                <Badge className="m-1" key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>
          <ExperiencesCard experiences={experiences} />
          <Card className="w-full mx-auto mt-4">
            <Title>첨부 자료</Title>
            <Text>
              첨부한 파일을 클릭하면 다운로드가 가능합니다. 파일을 추가하려면
              아래의 버튼을 눌러주세요.
            </Text>
            <div className="mt-4">
              {attachedFiles.map((file) => (
                <div key={file.id} className="flex justify-start items-center">
                  <a href={file.mediaLink} download={file.fileName}>
                    {file.fileName}
                  </a>
                  <div className="mx-2 flex items-center">
                    <FileDeleteButton
                      onDelete={onClickFileDelete}
                      fileId={file.id}
                    />
                  </div>
                </div>
              ))}
            </div>
            <FileAttachInput />
          </Card>
        </div>
      </div>
    </MainPageTemplate>
  );
}
