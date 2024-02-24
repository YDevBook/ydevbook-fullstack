'use client';

import { Button, Select, SelectItem, TextInput } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { GraduateStatusOptions, ProfileFormData } from '@/lib/definitions';

interface ProfileFormSchoolInputProps {}

const ProfileFormSchoolInput = ({}: ProfileFormSchoolInputProps) => {
  const router = useRouter();
  const { setValue, watch, register } = useFormContext<ProfileFormData>();
  const { graduateStatus } = watch();

  const onGraduateStatusChange = (value: string) => {
    setValue('graduateStatus', value);
  };

  return (
    <>
      <div className="w-full">
        <div className="mt-12">
          <h1 className="text-center text-[23px] font-extrabold  ">
            어떤 학력을 가지고 계신가요?
          </h1>
          <h2 className="mt-4 text-center text-[17px] font-normal text-gray-500">
            최종 학력을 입력해주세요.
          </h2>
        </div>
        <div className="mt-14">
          <div className="">
            <label className="text-[18px] font-extrabold" htmlFor="school">
              학교명
            </label>
            <TextInput
              {...register('school')}
              placeholder="학교명을 입력해주세요."
              maxLength={50}
              className="mt-2"
            />
          </div>
          <div className="mt-8">
            <label className="text-[18px] font-extrabold" htmlFor="major">
              전공
            </label>
            <TextInput
              {...register('major')}
              className="mt-2"
              placeholder="전공을 입력해주세요."
              maxLength={50}
            />
          </div>
          <div className="mt-8">
            <label
              className="text-[18px] font-extrabold"
              htmlFor="graduateStatus"
            >
              졸업 여부
            </label>
            <Select
              id="graduateStatus"
              defaultValue=""
              onValueChange={onGraduateStatusChange}
              value={graduateStatus}
              className="mt-2"
              placeholder="졸업 여부를 선택해주세요."
            >
              {GraduateStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full absolute left-0 bottom-0 p-4">
        <Button
          className="w-full"
          type="button"
          onClick={() => router.push('/profile-form?stage=' + '연락처')}
        >
          다음
        </Button>
      </div>
    </>
  );
};

export default ProfileFormSchoolInput;
