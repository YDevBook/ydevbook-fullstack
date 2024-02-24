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
        <div className="overflow-x-scroll">
          <div className="w-[800px] flex flex-wrap m-4">
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
        <label htmlFor="shortBio">한줄 소개</label>
        <TextInput
          {...register('shortBio')}
          placeholder="자신을 드러낼 수 있는 한 문장을 써주세요."
          maxLength={50}
        />
      </div>
      <Button type="submit">제출</Button>
    </>
  );
};

export default ProfileFormShortBioInput;
