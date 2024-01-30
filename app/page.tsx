import { auth } from '@/auth';
import { Text, Title, Button } from '@tremor/react';
import { sql } from '@vercel/postgres';
import Link from 'next/link';

export default async function IndexPage({}: {}) {
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
    isLoggedIn && hasProfile ? '/my-profile' : '/profile-form';

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>메인 랜딩 페이지</Title>
      <Text>서비스 소개 및 랜딩 디자인, 메인 CTA 생성</Text>
      <div className="flex flex-col space-y-2.5">
        <Link href={mainCTAHref}>
          <Button>프로필 생성 / 마이 프로필(메인 CTA)</Button>
        </Link>
      </div>
    </main>
  );
}
