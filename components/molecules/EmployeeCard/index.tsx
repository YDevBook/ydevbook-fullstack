'use client';

import { Badge, Button, Card } from '@tremor/react';
import Image from 'next/image';
import { useContext } from 'react';
import DefaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { NotificationContext } from '@/contexts/NotificationContext';
import { Profile } from '@/lib/definitions';

interface EmployeeCardProps {
  profile: Profile;
}

const EmployeeCard = ({ profile }: EmployeeCardProps) => {
  const { setContent, setIsOpen } = useContext(NotificationContext);
  const onClick = () => {
    setContent?.({
      title: '프로필 확인하기',
      description:
        '프로필 조회 기능은 준비 중에 있습니다. 연락처 조회 및 인터뷰 요청이 필요하시면 contact@developool.com 으로 연락 부탁드립니다. 신속히 처리해드리겠습니다.',
    });
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
          <Image
            className="h-24 w-24 rounded-lg"
            src={profile.profileImageUrl || DefaultProfileImage}
            height={96}
            width={96}
            alt={`${profile.name || 'placeholder'} avatar`}
          />
        </div>
        <div className="flex-1 ml-4">
          <div className="space-x-1">
            {profile.name}{' '}
            {profile.positions?.map((position) => (
              <Badge className="bg-white" key={position}>
                {position}
              </Badge>
            ))}
          </div>
          <div className="mt-1">
            {profile.school} {profile.major}
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
