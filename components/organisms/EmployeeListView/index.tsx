import { Button } from '@tremor/react';
import Link from 'next/link';
import EmployeeCard from '@/components/molecules/EmployeeCard';
import { fetchFilteredProfilesAndPages } from '@/lib/data';

interface EmployeeListViewProps {
  query?: string;
  position?: string;
  currentPageNum?: number;
}

const EmployeeListView = async ({
  query,
  position,
  currentPageNum,
}: EmployeeListViewProps) => {
  const { data } = await fetchFilteredProfilesAndPages(
    { query, position },
    currentPageNum
  );

  return (
    <div>
      <div className="mt-4">
        {data?.profiles?.map((profile) => (
          <EmployeeCard key={profile.id} profile={profile} />
        ))}
      </div>
      <div className="my-4">
        <div className="flex max-w-md bg-red m-auto justify-center space-x-2">
          {Array.from({ length: data?.pages ?? 1 }, (_, i) => (
            <Link
              href={`/startup/developer-list?page=${i + 1}${
                !!query ? `&query=${query}` : ''
              }`}
              key={i}
            >
              <Button
                variant={currentPageNum === i + 1 ? 'primary' : 'secondary'}
                size="xs"
              >
                {i + 1}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeListView;
