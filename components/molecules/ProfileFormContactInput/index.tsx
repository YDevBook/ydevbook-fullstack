'use client';

import { ProfileFormData } from '@/lib/definitions';
import { Button, TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

interface ProfileFormContactlInputProps {}

const ProfileFormContactlInput = ({}: ProfileFormContactlInputProps) => {
  const router = useRouter();
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext<ProfileFormData>();
  const all = watch();

  return (
    <div className="w-full">
      <h2>기본 정보</h2>
      <label htmlFor="name">이름</label>
      <TextInput
        {...register('name', { required: '이름을 입력해주세요.' })}
        placeholder="이름을 입력해주세요."
        errorMessage={errors.name && errors.name.message}
        error={!!errors.name}
      />
      <label htmlFor="phoneNumber">전화번호</label>
      <TextInput
        {...register('phoneNumber', { required: '전화번호를 입력해주세요.' })}
        placeholder="전화번호를 입력해주세요."
        errorMessage={errors.phoneNumber && errors.phoneNumber.message}
        error={!!errors.phoneNumber}
      />
      <label htmlFor="email">이메일</label>
      <TextInput {...register('email')} placeholder="이메일을 입력해주세요." />
      <Button type="submit" onClick={() => console.log(all)}>
        다음
      </Button>
    </div>
  );
};

export default ProfileFormContactlInput;
