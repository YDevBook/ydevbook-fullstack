'use client';

import { Button, TextInput } from '@tremor/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
import { NotificationContext } from '@/contexts/NotificationContext';
import { updateProfileShortIntro } from '@/lib/actions';
import {
  IntroductionKeywords,
  Profile,
  ProfileShortIntroUpdateFormData,
} from '@/lib/definitions';

interface ProfileShortIntroUpdateFormProps {
  profile: Profile;
}

const ProfileShortIntroUpdateForm = ({
  profile,
}: ProfileShortIntroUpdateFormProps) => {
  const { register, handleSubmit, watch, setValue } =
    useForm<ProfileShortIntroUpdateFormData>({
      defaultValues: {
        shortBio: profile.shortBio,
        introductionKeywords: profile.introductionKeywords,
      },
    });
  const { introductionKeywords } = watch();
  const { setContent, setIsOpen } = useContext(NotificationContext);

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

  const action: () => void = handleSubmit(async (data) => {
    try {
      const response = await updateProfileShortIntro(data);
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '프로필을 수정했습니다.',
          onConfirm: () => window.location.replace('/my-profile'),
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  });

  return (
    <form action={action}>
      <label htmlFor="shortBio">한줄 소개</label>
      <TextInput
        {...register('shortBio')}
        placeholder="자신을 드러낼 수 있는 한 문장을 써주세요."
        maxLength={50}
      />
      <div className="h-40 m-4 overflow-auto">
        {IntroductionKeywords?.map((keyword) => (
          <BadgeSelectItem
            key={keyword}
            label={keyword}
            value={keyword}
            clicked={
              !!introductionKeywords &&
              introductionKeywords?.findIndex((item) => item === keyword) !== -1
            }
            onClick={onClickBadge}
          />
        ))}
      </div>
      <Button type="submit">제출</Button>
    </form>
  );
};

export default ProfileShortIntroUpdateForm;
