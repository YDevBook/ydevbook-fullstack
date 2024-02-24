'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import ProfileFormContactInput from '@/components/molecules/ProfileFormContactInput';
import ProfileFormPositionInput from '@/components/molecules/ProfileFormPositionInput';
import ProfileFormSchoolInput from '@/components/molecules/ProfileFormSchoolInput';
import ProfileFormShortBioInput from '@/components/molecules/ProfileFormShortBioInput';
import ProfileFormSkillInput from '@/components/molecules/ProfileFormSkillInput';
import { NotificationContext } from '@/contexts/NotificationContext';
import { insertProfile } from '@/lib/actions';
import { ProfileFormData, ProfileFormStage } from '@/lib/definitions';

// 직군 -> 기술 -> 학력 -> 이름, 이메일, 전화번호 -> 한줄 소개

const ProfileForm = ({
  positionSelectItems,
  skillsSelectItems,
}: {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage') as ProfileFormStage;
  const { setIsOpen, setContent } = useContext(NotificationContext);

  const methods = useForm<ProfileFormData>({
    defaultValues: {
      positions: [],
      skills: [],
    },
  });
  const { handleSubmit, watch } = methods;
  const { positions, skills } = watch();

  const action: () => void = handleSubmit(async (data) => {
    if (positions?.length === 0 || skills?.length === 0) {
      setContent?.({
        title: 'Error',
        description:
          '정보가 정확하게 입력되지 않았습니다. 처음부터 다시 입력해주세요.',
        onConfirm: () => router.replace('/profile-form?stage=포지션'),
      });
      setIsOpen?.(true);
      return;
    }
    try {
      const response = await insertProfile(data);
      if (response.status === 409) {
        setContent?.({
          title: 'Error',
          description: '프로필이 이미 존재합니다.',
          onConfirm: () => router.replace('/my-profile'),
        });
        setIsOpen?.(true);
        return;
      }
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '프로필을 생성했습니다.',
          onConfirm: () => router.replace('/my-profile'),
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '프로필 생성에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 생성에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  });

  return (
    <>
      <h1 className="text-lg">
        간편 이력을 등록하고 스카우트 제안을 받아보세요.
      </h1>
      <FormProvider {...methods}>
        <form
          action={action}
          className="h-full flex-grow flex flex-col justify-between"
        >
          {!stage ||
            (stage === '포지션' && (
              <ProfileFormPositionInput
                positionSelectItems={positionSelectItems}
              />
            ))}
          {stage === '기술' && (
            <ProfileFormSkillInput skillsSelectItems={skillsSelectItems} />
          )}
          {stage === '학력' && <ProfileFormSchoolInput />}
          {stage === '연락처' && <ProfileFormContactInput />}
          {stage === '한줄소개' && <ProfileFormShortBioInput />}
        </form>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
