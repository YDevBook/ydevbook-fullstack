import { Title, Text, Button } from '@tremor/react';
import Link from 'next/link';

export default function StartupLandingPage() {
  const mainCTAHref = '/startup/developer-list';
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>StartupLanding</Title>
      <Text>StartupLanding</Text>
      <div className="flex flex-col space-y-2.5">
        <Link href={mainCTAHref}>
          <Button>개발자 풀 목록 보러가기</Button>
        </Link>
      </div>
    </main>
  );
}
