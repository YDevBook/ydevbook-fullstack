'use client';

import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import { ArrayItemQueryRows, ProfileFormData } from '@/lib/definitions';

interface ProfileFormSkillInputProps {
  skillsSelectItems: ArrayItemQueryRows[];
}

const ProfileFormSkillInput = ({
  skillsSelectItems,
}: ProfileFormSkillInputProps) => {
  const router = useRouter();
  const {
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useFormContext<ProfileFormData>();
  const { skills } = watch();

  const onClickBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = skills?.filter((skill) => skill !== value);
      setValue('skills', newList);
    } else {
      setValue('skills', [...(skills ?? []), value]);
    }
  };

  const onClick = () => {
    if (!skills || skills.length === 0) {
      setError('skills', {
        type: 'required',
        message: '최소 하나의 기술을 선택해주세요.',
      });
      return;
    } else {
      router.push('/profile-form?stage=' + '학력');
    }
  };

  return (
    <>
      <div className="w-full">
        <h2>보유 기술</h2>
        <div className="overflow-x-scroll">
          <div className="w-[3000px] flex flex-wrap m-4">
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
        </div>
        {!!errors.skills && (
          <p className="py-2 text-red-500">{errors.skills.message}</p>
        )}
      </div>
      <Button type="button" onClick={onClick} className="w-full">
        다음
      </Button>
    </>
  );
};

export default ProfileFormSkillInput;
