'use client';

import { ArrayItemQueryRows, ProfileFormData } from '@/lib/definitions';
import { Button, MultiSelect, MultiSelectItem } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

interface ProfileFormPositionInputProps {
  positionSelectItems: ArrayItemQueryRows[];
}

const ProfileFormPositionInput = ({
  positionSelectItems
}: ProfileFormPositionInputProps) => {
  const router = useRouter();
  const { setValue, watch } = useFormContext<ProfileFormData>();
  const { positions } = watch();

  const onChange = (values: string[]) => {
    setValue('positions', values);
  };

  return (
    <div className="w-full">
      <label htmlFor="positions">구직중인 포지션</label>
      <MultiSelect defaultValue={[]} value={positions} onValueChange={onChange}>
        {positionSelectItems.map((item) => (
          <MultiSelectItem key={item.name} value={item.name}>
            {item.name}
          </MultiSelectItem>
        ))}
      </MultiSelect>
      <Button
        type="button"
        onClick={() => router.push('/profile-form?stage=' + '기술')}
      >
        다음
      </Button>
    </div>
  );
};

export default ProfileFormPositionInput;
