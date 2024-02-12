'use client';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import { ArrayItemQueryRows, ProfileFormData } from '@/lib/definitions';
import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

interface ProfileFormSkillInputProps {
  skillsSelectItems: ArrayItemQueryRows[];
}

const ProfileFormSkillInput = ({
  skillsSelectItems
}: ProfileFormSkillInputProps) => {
  const router = useRouter();
  const { setValue, watch } = useFormContext<ProfileFormData>();
  const { skills } = watch();

  const onClickBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = skills?.filter((skill) => skill !== value);
      setValue('skills', newList);
    } else {
      setValue('skills', [...(skills ?? []), value]);
    }
  };

  return (
    <div className="w-full">
      <h2>보유 기술</h2>
      <div className="h-40 m-4 overflow-auto">
        {skillsSelectItems?.map((skill) => (
          <BadgeSelectItem
            key={skill.name}
            label={skill.name}
            value={skill.name}
            clicked={
              !!skills &&
              skills?.findIndex((item) => item === skill.name) !== -1
            }
            onClick={onClickBadge}
          />
        ))}
      </div>
      <Button
        type="button"
        onClick={() => router.push('/profile-form?stage=' + '학력')}
      >
        다음
      </Button>
    </div>
  );
};

export default ProfileFormSkillInput;
