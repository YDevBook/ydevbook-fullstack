'use client';

import { Select, SelectItem, TextInput } from '@tremor/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const positionList = [
  '프론트엔드',
  '백엔드',
  '풀스택',
  '데이터사이언티스트',
  'DevOps',
  '게임 서버',
];

const EmployeeListSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
    { leading: true }
  );

  const handlePositionFilter = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', '1');
      if (term) {
        params.set('position', term);
      } else {
        params.delete('position');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
    { leading: true }
  );

  return (
    <div className="relative">
      <div className="mt-4">
        <Select
          onValueChange={(value) => handlePositionFilter(value)}
          defaultValue={searchParams.get('position')?.toString()}
          placeholder="포지션으로 검색"
          className="w-14"
        >
          {positionList.map((position) => (
            <SelectItem key={position} value={position}>
              {position}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="mt-2">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <TextInput
          placeholder={'이름 및 이메일로 검색'}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </div>
  );
};

export default EmployeeListSearch;
