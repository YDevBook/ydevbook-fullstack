'use client';

import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import {
  ArrayItemQueryRows,
  ProfileFormData,
  ProfileFormStage,
} from '@/lib/definitions';

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
    clearErrors,
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
      clearErrors('skills');
      router.push('/profile-form?stage=' + ProfileFormStage.학력);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-12">
          <h1 className="text-center text-[23px] font-extrabold  ">
            어떤 개발 기술을 가지고 계신가요?
          </h1>
          <h2 className="mt-4 text-center text-[17px] font-normal text-gray-500">
            활용 가능한 기술을 선택해주세요.
          </h2>
        </div>
        <label className="text-[18px] font-extrabold mt-14 inline-block">
          기술 스택
        </label>
        <div className="overflow-x-scroll mt-8">
          <div className="w-[3000px] flex flex-wrap mb-8">
            {skillsSelectItems?.map((skill) => (
              <BadgeSelectItem
                key={skill.name}
                label={skill.name}
                value={skill.name}
                iconSrc="🧑‍💻"
                clicked={
                  !!skills &&
                  skills?.findIndex((item) => item === skill.name) !== -1
                }
                onClick={onClickBadge}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full absolute left-0 bottom-0 p-4">
        {!!errors.skills && (
          <p className="py-4 text-red-400 text-center">
            {errors.skills.message}
          </p>
        )}
        <Button className="w-full" type="button" onClick={onClick}>
          다음
        </Button>
      </div>
    </>
  );
};

export default ProfileFormSkillInput;
