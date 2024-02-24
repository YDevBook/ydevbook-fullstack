'use client';

import { Button, TextInput } from '@tremor/react';
import { useFormContext } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import { IntroductionKeywords, ProfileFormData } from '@/lib/definitions';

interface ProfileFormShortBioInputProps {}

const ProfileFormShortBioInput = ({}: ProfileFormShortBioInputProps) => {
  const { setValue, watch, register } = useFormContext<ProfileFormData>();
  const all = watch();
  const { introductionKeywords } = all;

  const onClickBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = introductionKeywords?.filter((skill) => skill !== value);
      setValue('introductionKeywords', newList);
    } else if (introductionKeywords?.length === 3) {
      window.alert('최대 3개까지 선택 가능합니다.');
      return;
    } else {
      setValue('introductionKeywords', [
        ...(introductionKeywords ?? []),
        value,
      ]);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-12">
          <h1 className="text-center text-[23px] font-extrabold  ">
            어떤 개발자인지 알려주세요.
          </h1>
          <h2 className="mt-4 text-center text-[17px] font-normal text-gray-500">
            간단하게 본인을 표현해보세요.
          </h2>
        </div>
        <div className="overflow-x-scroll mt-8">
          <div className="w-[700px] flex flex-wrap mb-8">
            {IntroductionKeywords?.map((keyword) => (
              <BadgeSelectItem
                key={keyword}
                label={keyword}
                value={keyword}
                clicked={
                  !!introductionKeywords &&
                  introductionKeywords?.findIndex(
                    (item) => item === keyword
                  ) !== -1
                }
                onClick={onClickBadge}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="shortBio" className="text-[18px] font-extrabold">
            한줄 소개
          </label>
          <TextInput
            {...register('shortBio')}
            placeholder="자신을 드러낼 수 있는 한 문장을 써주세요."
            className="mt-2"
            maxLength={50}
          />
        </div>
      </div>
      <Button type="submit">제출</Button>
    </>
  );
};

export default ProfileFormShortBioInput;
