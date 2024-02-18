import { Title, Text } from '@tremor/react';
import clsx from 'clsx';
import Link from 'next/link';

import EmployeeCard from '@/components/molecules/EmployeeCard';
import EmployeeListSearch from '@/components/organisms/EmployeeListSearch';
import { fetchFilteredProfile, fetchFilteredProfilesPages } from '@/lib/data';

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

  const { data: profiles } = await fetchFilteredProfile(
    { query, position },
    currentPageNum
  );
  const { data: totalPageNum } = await fetchFilteredProfilesPages({
    query,
    position,
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>DeveloperList</Title>
      <Text>DeveloperList</Text>
      <div>
        <div>
          <EmployeeListSearch />
        </div>
      </div>
      <div className="mt-4">
        {profiles?.map((profile) => (
          <EmployeeCard key={profile.id} profile={profile} />
        ))}
      </div>
      <div className="my-4">
        <div className="flex max-w-md bg-red m-auto justify-center">
          {Array.from({ length: totalPageNum ?? 1 }, (_, i) => (
            <Link
              href={`/startup/developer-list?page=${i + 1}${
                !!query ? `&query=${query}` : ''
              }`}
              key={i}
            >
              <button
                className={clsx(
                  ' m-4 w-8 h-8 text-center',
                  currentPageNum === i + 1 && 'bg-red-500'
                )}
              >
                {i + 1}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
