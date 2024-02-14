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
    <div className="w-full">
      <h2>최종 학력</h2>
      <label htmlFor="school">학교명</label>
      <TextInput {...register('school')} placeholder="" maxLength={50} />
      <label htmlFor="major">전공</label>
      <TextInput {...register('major')} placeholder="" maxLength={50} />
      <label htmlFor="graduateStatus">졸업 여부</label>
      <Select
        defaultValue=""
        onValueChange={onGraduateStatusChange}
        value={graduateStatus}
      >
        {GraduateStatusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>

      <Button
        type="button"
        onClick={() => router.replace('/profile-form?stage=' + '연락처')}
      >
        다음
      </Button>
    </div>
  );
};

export default ProfileFormSchoolInput;
