'use client';

import { Badge, Button, Card } from '@tremor/react';
import Image from 'next/image';
import { useContext } from 'react';
import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { NotificationContext } from '@/contexts/NotificationContext';
import { GraduateStatusOptions, Profile } from '@/lib/definitions';

interface EmployeeCardProps {
  profile: Profile;
}

const EmployeeCard = ({ profile }: EmployeeCardProps) => {
  const { setContent, setIsOpen } = useContext(NotificationContext);
  const onClick = () => {
    if (!profile.isActivelySeeking) {
      setContent?.({
        title: '프로필 확인하기',
        description:
          '적극 구직 중이 아닌 개발자의 개인 정보는 비공개 처리됩니다. \n 적극 구직 중인 개발자에게 컨택해보세요.',
      });
    } else {
      setContent?.({
        title: '프로필 확인하기',
        description:
          '프로필 조회 기능은 준비 중에 있습니다. \n연락처 조회 및 인터뷰 요청이 필요하시면 \ncontact@developool.com 으로 연락 부탁드립니다. 신속히 처리해드리겠습니다.',
      });
    }
    setIsOpen?.(true);
  };

  return (
    <Card className="mt-2 p-4 cursor-pointer relative" onClick={onClick}>
      <Button
        variant="light"
        className="absolute m-4 top-0 right-0"
        color="gray"
      >
        프로필 확인하기
      </Button>
      <div className="flex ">
        <div>
          <div>
            <Image
              className="h-24 w-24 rounded-lg"
              src={profile.profileImageUrl || DefaultProfileImage}
              height={96}
              width={96}
              alt={`${profile.name || 'placeholder'} avatar`}
            />
          </div>
          {profile.isActivelySeeking && (
            <div className="flex justify-center items-center mt-1">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <span className="text-sm ml-1">적극 구직 중</span>
            </div>
          )}
        </div>
        <div className="flex-1 ml-4">
          <div className="space-x-1">
            {profile.name.trim()[0]}
            {'OO '}
            {profile.positions?.map((position) => (
              <Badge className="bg-white" key={position}>
                {position}
              </Badge>
            ))}
          </div>
          <div className="mt-1">
            {profile.school} {profile.major}{' '}
            {!!profile.graduateStatus &&
              ' / ' +
                GraduateStatusOptions.find(
                  (option) => option.value === profile.graduateStatus
                )?.label}
          </div>
          <div className="mt-1 space-x-1">
            {profile.skills?.map((skill) => (
              <Badge className="bg-white" size="xs" key={skill}>
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-1">010-****-**** ***@*****.com</div>
          <div className="mt-1 space-x-1">
            {profile.introductionKeywords?.map((keyword) => (
              <Badge className="bg-white" size="xs" key={keyword}>
                {keyword}
              </Badge>
            ))}
          </div>
          <div className="mt-1">{profile.shortBio}</div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
