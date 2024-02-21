import { Title, Text, Button } from '@tremor/react';
import Link from 'next/link';
import MainPageTemplate from '@/components/templates/MainPageTemplate';

export default function StartupLandingPage() {
  const mainCTAHref = '/startup/developer-list';
  return (
    <MainPageTemplate>
      <Title>StartupLanding</Title>
      <Text>StartupLanding</Text>
      <div className="flex flex-col space-y-2.5">
        <Link href={mainCTAHref}>
          <Button>개발자 풀 목록 보러가기</Button>
        </Link>
      </div>
    </MainPageTemplate>
  );
}
