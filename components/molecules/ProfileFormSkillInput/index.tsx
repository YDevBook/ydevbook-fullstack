'use client';

import { Button, TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
  const [searchValue, setSearchValue] = useState('');

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
        <TextInput
          className="mt-8"
          placeholder="기술 스택을 검색해보세요."
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
        />
        <div className="overflow-y-scroll max-h-60 mt-4 relative">
          <div className="w-full flex flex-wrap mb-8 items-start">
            {skillsSelectItems
              ?.filter(
                (skill) =>
                  searchValue === '' ||
                  skill.name
                    .toLowerCase()
                    .includes(searchValue.trim().toLowerCase())
              )
              .map((skill) => (
                <BadgeSelectItem
                  key={skill.name}
                  label={skill.name}
                  value={skill.name}
                  iconSrc="💻"
                  clicked={
                    !!skills &&
                    skills?.findIndex((item) => item === skill.name) !== -1
                  }
                  onClick={onClickBadge}
                />
              ))}
          </div>
          <div className="w-full h-10 sticky bottom-0 bg-gradient-to-b from-transparent to-gray-50 pointer-events-none" />
        </div>
      </div>
      <div className="w-full fixed left-0 bottom-0 p-4">
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
