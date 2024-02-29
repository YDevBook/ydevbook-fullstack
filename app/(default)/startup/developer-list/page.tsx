import { Text } from '@tremor/react';

import { Suspense } from 'react';
import EmployeeListSearch from '@/components/organisms/EmployeeListSearch';
import EmployeeListView from '@/components/organisms/EmployeeListView';
import MainPageTemplate from '@/components/templates/MainPageTemplate';

interface DeveloperListPageProps {
  searchParams?: {
    query?: string;
    page?: string;
    position?: string;
  };
}

export default async function DeveloperListPage({
  searchParams,
}: DeveloperListPageProps) {
  const query = searchParams?.query || '';
  const currentPageNum = Number(searchParams?.page) || 1;
  const position = searchParams?.position || '';

  return (
    <MainPageTemplate>
      <h1 className="text-2xl">인재풀 조회하기</h1>
      <Text>대학생 개발자들의 프로필을 확인하실 수 있습니다.</Text>
      <div>
        <EmployeeListSearch />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <EmployeeListView
          query={query}
          position={position}
          currentPageNum={currentPageNum}
        />
      </Suspense>
    </MainPageTemplate>
  );
}
