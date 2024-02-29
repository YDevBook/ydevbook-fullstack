'use client';
import { RiCloseLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';

const ProfileEditModalHeader = () => {
  const router = useRouter();

  return (
    <div className="w-full ">
      <div className="relative">
        <h3 className="text-lg font-extrabold w-full text-center">
          프로필 수정
        </h3>
        <button
          onClick={() => router.replace('/my-profile')}
          className="absolute top-0 right-0 rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500"
        >
          <RiCloseLine className="h-7 w-7" />
        </button>
      </div>
      {/* <div>
        <TabGroup>
          <TabList>
            <Tab value={ProfileEditParams.기본정보}>기본 정보</Tab>
            <Tab value={ProfileEditParams.간단소개}>간단 소개</Tab>
            <Tab value={ProfileEditParams.자기소개}>자기 소개</Tab>
            <Tab value={ProfileEditParams.포지션기술}>구직 정보</Tab>
            <Tab value={ProfileEditParams.경력}>경력</Tab>
          </TabList>
        </TabGroup>
      </div> */}
    </div>
  );
};

export default ProfileEditModalHeader;
