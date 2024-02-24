'use client';

import { RiArrowLeftSLine } from '@remixicon/react';
import { useRouter } from 'next/navigation';
import StageIndex from '@/components/atoms/StageIndex';
import { ProfileFormStage, ProfileFormStages } from '@/lib/definitions';

interface ProfileFormStageHeaderProps {
  stage: ProfileFormStage;
}

const ProfileFormStageHeader = ({ stage }: ProfileFormStageHeaderProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="w-full">
      <div>
        <RiArrowLeftSLine
          className="w-7 h-7 fill-gray-400 cursor-pointer"
          onClick={goBack}
        />
      </div>
      <div className="flex justify-center items-center">
        {ProfileFormStages.map((value, index) => {
          return (
            <StageIndex
              key={index}
              indexNumber={value === stage ? index + 1 : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileFormStageHeader;
