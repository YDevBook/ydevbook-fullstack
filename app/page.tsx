import { Card, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';

import { auth } from '@/auth';
import MainPageTemplate from '@/components/templates/MainPageTemplate';

export default async function IndexPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  let hasProfile = false;
  if (isLoggedIn) {
    const result = await sql`
      SELECT COUNT(*) FROM profiles WHERE "userId" = ${session.user.id};
    `;
    hasProfile = result.rows[0].count !== '0';
  }
  const mainCTAHref =
    isLoggedIn && hasProfile ? '/my-profile' : '/profile-form?stage=포지션';

  return (
    <MainPageTemplate>
      <div className="flex flex-col justify-center items-center my-24">
        <h1 className="text-2xl font-bold text-center whitespace-pre">
          간편한 프로필 등록으로 <br />
          유망한 스타트업의 연락을{'\n'}
          받을 수 있는 기회!
        </h1>
        <p className="mt-8 text-lg text-gray-700">
          대학생 개발자로서 스타트업에 합류해보세요.
        </p>
        <a
          href={mainCTAHref}
          className="mt-8 px-8 py-2 bg-blue-500 text-white rounded-md"
        >
          {isLoggedIn && hasProfile ? '내 프로필 보기' : '프로필 등록하기'}
        </a>
      </div>
      <div className="flex flex-col justify-center items-center my-24">
        <div className="w-full px-10">
          <p className="text-xl font-medium my-4">
            스타트업에 나의 강점을 노출 시켜보세요.
          </p>
        </div>
        <div className="px-10 w-full">
          <Card>
            <Title>나의 프로필 카드 예시</Title>
            학력: 연세대학교 컴퓨터과학과 <br /> 키워드 1 | 키워드 2 | 키워드 3
            <br />한 줄 소개 -----------
          </Card>
        </div>
      </div>
      <div className="flex flex-col items-center my-24">
        <div className="w-[70%] h-[200px] bg-slate-600 rounded-md">
          {/* <Image src={StartupImage} alt="startup image" layout="fill" /> */}
        </div>
        <div className="mt-4">
          <p>연뎁북은 한창 개발 중인 프로덕트입니다.</p>
        </div>
      </div>
    </MainPageTemplate>
  );
}
