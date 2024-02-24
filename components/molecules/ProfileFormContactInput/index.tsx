'use client';

import { Button, TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { ProfileFormData } from '@/lib/definitions';

interface ProfileFormContactlInputProps {}

const ProfileFormContactlInput = ({}: ProfileFormContactlInputProps) => {
  const {
    register,
    formState: { errors },
    trigger,
    clearErrors,
  } = useFormContext<ProfileFormData>();
  const router = useRouter();

  const onClickNext = () => {
    trigger(['name', 'phoneNumber', 'email']).then((result) => {
      if (result) {
        clearErrors();
        router.push('/profile-form?stage=' + '한줄소개');
      } else {
        return;
      }
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-12">
          <h1 className="text-center text-[23px] font-extrabold  ">
            이름 및 연락처를 알려주세요.
          </h1>
          <h2 className="mt-4 text-center text-[17px] font-normal text-gray-500">
            컨택을 위해 필요한 정보입니다.
          </h2>
        </div>
        <div className="mt-14">
          <div className="">
            <label className="text-[18px] font-extrabold" htmlFor="name">
              이름
            </label>
            <TextInput
              {...register('name', {
                required: '이름을 입력해주세요.',
              })}
              maxLength={255}
              placeholder="이름을 입력해주세요."
              errorMessage={errors.name && errors.name.message}
              error={!!errors.name}
              className="mt-2"
            />
          </div>
          <div className="mt-8">
            <label className="text-[18px] font-extrabold" htmlFor="phoneNumber">
              전화번호
            </label>
            <TextInput
              {...register('phoneNumber', {
                required: '전화번호를 입력해주세요.',
              })}
              placeholder="전화번호를 입력해주세요."
              maxLength={20}
              errorMessage={errors.phoneNumber && errors.phoneNumber.message}
              error={!!errors.phoneNumber}
              className="mt-2"
            />
          </div>
          <div className="mt-8">
            <label className="text-[18px] font-extrabold" htmlFor="email">
              이메일
            </label>
            <TextInput
              {...register('email', { required: '이메일을 입력해주세요.' })}
              placeholder="이메일을 입력해주세요."
              maxLength={50}
              className="mt-2"
              errorMessage={errors.email && errors.email.message}
              error={!!errors.email}
            />
          </div>
        </div>
      </div>
      <div className="w-full">
        <Button className="w-full" type="button" onClick={onClickNext}>
          다음
        </Button>
      </div>
    </>
  );
};

export default ProfileFormContactlInput;
