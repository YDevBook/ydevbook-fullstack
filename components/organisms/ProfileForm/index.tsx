'use client';

import { ProfileFormData } from '@/lib/definitions';
import { FormProvider, useForm } from 'react-hook-form';
import useLocalStorage from '@/lib/useLocalStorage';
import { insertProfile } from '@/lib/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Title } from '@tremor/react';
import { useContext } from 'react';
import { NotificationContext } from '@/contexts/NotificationContext';
import { useSession } from 'next-auth/react';
import ProfileFormPositionInput from '@/components/molecules/ProfileFormPositionInput';
import ProfileFormSkillInput from '@/components/molecules/ProfileFormSkillInput';
import ProfileFormSchoolInput from '@/components/molecules/ProfileFormSchoolInput';
import ProfileFormContactInput from '@/components/molecules/ProfileFormContactInput';

// 직군 -> 기술 -> 학력 -> 이름, 이메일, 전화번호

const ProfileForm = ({
  positionSelectItems,
  skillsSelectItems
}: {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stage = searchParams.get('stage');
  const { data: session } = useSession();
  const { setIsOpen, setContent } = useContext(NotificationContext);
  // const [localStorageValue, setLocalStorageValue] =
  //   useLocalStorage<ProfileFormData>('profileForm', {
  //     phoneNumber: '',
  //     email: session?.user?.email || '',
  //     positions: [],
  //     skills: []
  //   });

  const methods = useForm<ProfileFormData>();
  const { handleSubmit } = methods;

  const action: () => void = handleSubmit(async (data) => {
    // setLocalStorageValue(data);
    try {
      const response = await insertProfile(data);
      if (response.status === 409) {
        setContent?.({
          title: 'Error',
          description: '프로필이 이미 존재합니다.',
          onConfirm: () => router.replace('/my-profile')
        });
        setIsOpen?.(true);
        return;
      }
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '프로필을 생성했습니다.',
          onConfirm: () => router.replace('/my-profile')
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '프로필 생성에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 생성에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
    }
  });

  return (
    <div className="mx-auto w-full max-w-[640px] space-y-2.5 p-8">
      <h1 className="text-lg">
        간편 이력을 등록하고 스카우트 제안을 받아보세요.
      </h1>
      <FormProvider {...methods}>
        <form action={action}>
          {stage === '포지션' && (
            <ProfileFormPositionInput
              positionSelectItems={positionSelectItems}
            />
          )}
          {stage === '기술' && (
            <ProfileFormSkillInput skillsSelectItems={skillsSelectItems} />
          )}
          {stage === '학력' && <ProfileFormSchoolInput />}
          {stage === '연락처' && <ProfileFormContactInput />}
          {/* <div>
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            className="border border-gray-300"
            {...register('phoneNumber', { required: true, maxLength: 11 })}
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            className="border border-gray-300"
            type="email"
            {...register('email', { required: true })}
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth">생년월일</label>
          <input
            className="border border-gray-300"
            type="date"
            {...register('dateOfBirth')}
          />
        </div>
        <div>
          <label htmlFor="address">거주 지역</label>
          <input className="border border-gray-300" {...register('address')} />
        </div>
        <div>
          <label htmlFor="school">최종 학력</label>
          <input className="border border-gray-300" {...register('school')} />
        </div>
        <div>
          <label htmlFor="major">전공</label>
          <input className="border border-gray-300" {...register('major')} />
        </div>
        <div>
          <label htmlFor="githubLink">깃헙 링크</label>
          <input
            className="border border-gray-300"
            {...register('githubLink')}
          />
        </div>
        <div>
          <label htmlFor="positions">구직중인 포지션</label>
          <select {...register('positions')} multiple>
            {positionSelectItems.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="skills">보유 기술</label>
          <select {...register('skills')} multiple>
            {skillsSelectItems.map((item) => (
              <option value={item.name} key={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div> */}
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;
