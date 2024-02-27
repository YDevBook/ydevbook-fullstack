import {
  RiCakeLine,
  RiGithubLine,
  RiGraduationCapLine,
  RiLink,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
} from '@remixicon/react';
import { Badge, Card, Text, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import clsx from 'clsx';
import { unstable_noStore as noStore } from 'next/cache';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { auth } from '@/auth';
import EditLinkIcon from '@/components/atoms/EditLinkIcon';
import FileDeleteButton from '@/components/atoms/FileDeleteButton';
import ActivelyJobSeekingSwitchCard from '@/components/molecules/ActivelyJobSeekingSwitchCard';
import FileAttachInput from '@/components/molecules/FileAttachInput';
import ExperiencesCard from '@/components/organisms/ExperiencesCard';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import {
  ArrayItemQueryRows,
  AttachmentFiles,
  Experience,
  GraduateStatusOptions,
  Profile,
  ProfileEditParams,
} from '@/lib/definitions';

interface MyProfilePageProps {
  searchParams?: {
    edit?: ProfileEditParams;
  };
}
const ModalTemplate = dynamic(
  () => import('@/components/templates/ModalTemplate')
);
const ProfileEditModalHeader = dynamic(
  () => import('@/components/organisms/ProfileEditModalHeader')
);
const ProfileShortIntroUpdateForm = dynamic(
  () => import('@/components/organisms/ProfileShortIntroUpdateForm')
);
const ProfileTextUpdateForm = dynamic(
  () => import('@/components/organisms/ProfileTextUpdateForm')
);
const ProfileUpdateForm = dynamic(
  () => import('@/components/organisms/ProfileUpdateForm')
);
const ExperiencesUpdate = dynamic(
  () => import('@/components/organisms/ExperiencesUpdate')
);
const ProfilePositionAndSkillUpdateForm = dynamic(
  () => import('@/components/organisms/ProfilePositionAndSkillUpdateForm')
);

export default async function MyProfilePage({
  searchParams,
}: MyProfilePageProps) {
  noStore();
  const session = await auth();
  const { edit } = searchParams || {};
  if (session?.user.isStartup) {
    redirect('/startup/my-info');
  }
  let profile = {} as Profile;
  let experiences = [] as Experience[];
  let attachedFiles = [] as AttachmentFiles[];
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];

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
    const positionsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM positions;
      `;
    const skillsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM skills;
      `;

    const [
      profileQueryResults,
      experiencesQueryResults,
      attachedFilesQueryResults,
      positionsQueryResults,
      skillsQueryResults,
    ] = await Promise.all([
      profilePromise,
      experiencesPromise,
      attachedFilesPromise,
      positionsSelectItemsPromise,
      skillsSelectItemsPromise,
    ]);

    if (profileQueryResults.rows.length === 0) {
      redirect('/profile-form');
    }
    profile = profileQueryResults.rows[0];
    experiences = experiencesQueryResults.rows;
    attachedFiles = attachedFilesQueryResults.rows;
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
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
    <>
      <MainPageTemplate>
        <Title className="my-4">내 프로필</Title>
        <div className="flex flex-col sm:flex-row">
          <div className="sm:basis-1/3">
            <Card className="relative w-full mx-auto">
              <EditLinkIcon
                href={`/my-profile?edit=${ProfileEditParams.기본정보}`}
              />
              <div className="relative flex flex-col items-center justify-center mt-8">
                <div className="relative inline-block">
                  <Image
                    src={session?.user.profileImageUrl || DefaultProfileImage}
                    alt="프로필 이미지"
                    width={100}
                    height={100}
                    className="rounded-full w-[120px] h-[120px] object-cover"
                  />
                </div>
                <p className="mt-4 text-[26px] font-extrabold">{name}</p>
              </div>
              <div className="mx-5 mt-10 font-extralight">
                <div className="flex items-center mt-2">
                  <RiPhoneLine className="flex-shrink-0" />
                  <span className="ml-4">{phoneNumber}</span>
                </div>
                <div className="flex items-center mt-2">
                  <RiMailLine className="flex-shrink-0" />
                  <span className="ml-4">{email}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center">
                    <RiGraduationCapLine className="flex-shrink-0" />
                    <span className={clsx('ml-4', !school && 'text-gray-300')}>
                      {school || '학력 정보를 업데이트 해주세요.'}
                    </span>
                  </div>
                  {!!school && (
                    <div className="mt-2 ml-10">
                      {major} /
                      {
                        GraduateStatusOptions.find(
                          (option) => option.value === graduateStatus
                        )?.label
                      }
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <RiCakeLine className="flex-shrink-0" />
                  <span
                    className={clsx('ml-4', !dateOfBirth && 'text-gray-300')}
                  >
                    {dateOfBirth?.toDateString() ||
                      '생년월일 정보를 업데이트 해주세요.'}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <RiMapPinLine className="flex-shrink-0" />
                  <span className={clsx('ml-4', !address && 'text-gray-300')}>
                    {address || '거주 지역 정보를 업데이트 해주세요.'}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <RiGithubLine className="flex-shrink-0" />
                  <span
                    className={clsx('ml-4', !githubLink && 'text-gray-300')}
                  >
                    {githubLink || '깃헙 페이지 정보를 업데이트 해주세요.'}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <RiLink className="flex-shrink-0" />
                  <span className={clsx('ml-4', !webLink && 'text-gray-300')}>
                    {webLink || '웹 페이지 정보를 업데이트 해주세요.'}
                  </span>
                </div>
              </div>
            </Card>
            <ActivelyJobSeekingSwitchCard
              initialIsActive={isActivelySeeking}
              onChange={onClickJobSeekingSwitch}
            />
          </div>
          <div className="mt-4 sm:basis-2/3 sm:ml-4 sm:mt-0">
            <Card className="w-full mx-auto">
              <EditLinkIcon
                href={`/my-profile?edit=${ProfileEditParams.간단소개}`}
              />
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
              <EditLinkIcon
                href={`/my-profile?edit=${ProfileEditParams.자기소개}`}
              />
              <Title>자기 소개</Title>
              <Text className="whitespace-pre-line">
                {personalStatement || '자기 소개 글을 등록해주세요.'}
              </Text>
            </Card>
            <Card className="w-full mx-auto mt-4">
              <EditLinkIcon
                href={`/my-profile?edit=${ProfileEditParams.포지션기술}`}
              />
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
                  <div
                    key={file.id}
                    className="flex justify-start items-center"
                  >
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
      {!!edit && Object.values(ProfileEditParams).includes(edit) && (
        <ModalTemplate>
          <ProfileEditModalHeader />
          {edit === ProfileEditParams.기본정보 && (
            <ProfileUpdateForm profile={profile} />
          )}
          {edit === ProfileEditParams.간단소개 && (
            <ProfileShortIntroUpdateForm profile={profile} />
          )}
          {edit === ProfileEditParams.자기소개 && (
            <ProfileTextUpdateForm
              columnName="personalStatement"
              defaultValue={profile.personalStatement}
            />
          )}
          {edit === ProfileEditParams.포지션기술 && (
            <ProfilePositionAndSkillUpdateForm
              profile={profile}
              positionSelectItems={positionSelectItems}
              skillsSelectItems={skillsSelectItems}
            />
          )}
          {edit === ProfileEditParams.경력 && (
            <ExperiencesUpdate
              experiences={experiences}
              positionSelectItems={positionSelectItems}
              skillsSelectItems={skillsSelectItems}
            />
          )}
        </ModalTemplate>
      )}
    </>
  );
}
