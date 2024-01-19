import { auth } from '@/auth';
import { Button } from '@/components/atoms/Button';
import { Profile } from '@/lib/definitions';
import { Badge, Card, Text, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function MyProfilePage() {
  noStore();
  const session = await auth();
  const { rows } = await sql<Profile>`
    SELECT * FROM profiles WHERE "userId" = ${session?.user.id};
  `;
  if (rows.length === 0) {
    redirect('/profile-form');
  }

  const {
    name,
    phoneNumber,
    email,
    dateOfBirth,
    sex,
    address,
    profileImage,
    positions,
    skills,
    school,
    major,
    graduateStatus,
    personalStatement,
    mainStrength,
    expectationText,
    githubLink,
    webLink,
    attachedFiles
  } = rows[0];

  return (
    <main className="p-4 mx-auto md:p-10 max-w-7xl">
      <Title className="my-4">내 프로필</Title>
      <div>
        <Card
          className="relative w-full mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
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
        </Card>

        <Card
          className="w-full mx-auto mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <Link href="/my-profile/edit">
            <Button className="absolute top-0 right-0 m-4">수정하기</Button>
          </Link>
          <Text>학력</Text>
          <Title>{school}</Title>
          <Text>전공</Text>
          <Title>{major}</Title>
          <Title>{graduateStatus}</Title>
        </Card>

        <Card
          className="w-full mx-auto mt-4"
          decoration="top"
          decorationColor="indigo"
        >
          <Link href="/my-profile/edit">
            <Button className="absolute top-0 right-0 m-4">수정하기</Button>
          </Link>
          <Text>구직중인 포지션</Text>
          <div className="my-2">
            {positions?.map((position) => (
              <Badge size="xl" color="slate" className="mx-1 " key={position}>
                {position}
              </Badge>
            ))}
          </div>
          <Text>보유 기술</Text>
          <div className="my-2">
            {skills?.map((skill) => (
              <Badge size="xl" color="slate" className="mx-1 " key={skill}>
                {skill}
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
          <Link href="/my-profile/edit-text?column=mainStrength">
            <Button className="absolute top-0 right-0 m-4">수정하기</Button>
          </Link>
          <Title>주요 강점</Title>
          <Text className="whitespace-pre-line">
            {mainStrength || '주요 강점을 소개해주세요.'}
          </Text>
        </Card>
        <Card className="w-full mx-auto mt-4">
          <Link href="/my-profile/edit-text?column=expectationText">
            <Button className="absolute top-0 right-0 m-4">수정하기</Button>
          </Link>
          <Title>스타트업에 기대하는 점</Title>
          <Text className="whitespace-pre-line">
            {expectationText || '스타트업에 기대하는 점을 알려주세요.'}
          </Text>
        </Card>
        <Card className="w-full mx-auto mt-4">
          <Link href="/my-profile/edit">
            <Button className="absolute top-0 right-0 m-4">수정하기</Button>
          </Link>
          <Title>첨부 자료</Title>
          <Text>깃헙 아이콘 {githubLink || '깃헙 링크를 등록해주세요.'}</Text>
          <Text>웹 아이콘 {webLink || '웹 링크를 등록해주세요.'}</Text>
          <Text>
            기타 첨부자료:{' '}
            {attachedFiles || '첨부 파일 다운로드 기능 추가 필요'}
          </Text>
        </Card>
      </div>
    </main>
  );
}
