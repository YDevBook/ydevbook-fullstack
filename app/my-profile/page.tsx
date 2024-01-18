import { auth } from '@/auth';
import { Button } from '@/components/atoms/Button';
import { Profile } from '@/lib/definitions';
import { Title, Text, Card, Badge } from '@tremor/react';
import { sql } from '@vercel/postgres';
import Link from 'next/link';

export default async function MyProfilePage() {
  const session = await auth();
  const { rows } = await sql<Profile>`
    SELECT * FROM profiles WHERE "userId" = ${session?.user.id};
  `;
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
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title className="my-4">내 프로필</Title>
      <div>
        <Card
          className="w-full mx-auto"
          decoration="top"
          decorationColor="indigo"
        >
          <Text>이름</Text>
          <Title>{name}</Title>
          <Text>전화번호</Text>
          <Title>{phoneNumber}</Title>
          <Text>이메일</Text>
          <Title>{email}</Title>
          <Text>생년월일</Text>
          <Title>{dateOfBirth || '생년월일 정보를 업데이트 해주세요.'}</Title>
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
          <Title>자기 소개</Title>
          <Text>{personalStatement || '자기 소개 글을 등록해주세요.'}</Text>
        </Card>
        <Card className="w-full mx-auto mt-4">
          <Title>주요 강점</Title>
          <Text>{mainStrength || '주요 강점을 소개해주세요.'}</Text>
        </Card>
        <Card className="w-full mx-auto mt-4">
          <Title>스타트업에 기대하는 점</Title>
          <Text>
            {expectationText || '스타트업에 기대하는 점을 알려주세요.'}
          </Text>
        </Card>
        <Card className="w-full mx-auto mt-4">
          <Title>첨부 자료</Title>
          <Text>깃헙 아이콘 {githubLink || '깃헙 링크를 등록해주세요.'}</Text>
          <Text>웹 아이콘 {webLink || '웹 링크를 등록해주세요.'}</Text>
          <Text>
            기타 첨부자료:{' '}
            {attachedFiles || '첨부 파일 다운로드 기능 추가 필요'}
          </Text>
        </Card>
      </div>
      <div className="my-8 w-full flex justify-center">
        <Link href="/my-profile/edit">
          <Button>수정하기</Button>
        </Link>
      </div>
    </main>
  );
}
