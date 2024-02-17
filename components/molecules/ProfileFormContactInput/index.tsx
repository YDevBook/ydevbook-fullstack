'use client';

import { Button, TextInput } from '@tremor/react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ProfileFormData } from '@/lib/definitions';

interface ProfileFormContactlInputProps {}

const ProfileFormContactlInput = ({}: ProfileFormContactlInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ProfileFormData>();
  const router = useRouter();

  return (
    <div className="w-full">
      <h2>기본 정보</h2>
      <div className="mt-4">
        <label htmlFor="name">이름</label>
        <TextInput
          {...register('name', {
            required: '이름을 입력해주세요.'
          })}
          maxLength={255}
          placeholder=""
          errorMessage={errors.name && errors.name.message}
          error={!!errors.name}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="phoneNumber">전화번호</label>
        <TextInput
          {...register('phoneNumber', { required: '전화번호를 입력해주세요.' })}
          placeholder=""
          maxLength={20}
          errorMessage={errors.phoneNumber && errors.phoneNumber.message}
          error={!!errors.phoneNumber}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="email">이메일</label>
        <TextInput
          {...register('email', { required: '이메일을 입력해주세요.' })}
          placeholder=""
          maxLength={50}
        />
        <Button
          type="button"
          onClick={() => router.replace('/profile-form?stage=' + '한줄소개')}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default ProfileFormContactlInput;
