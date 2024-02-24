'use client';

import { Button, MultiSelect, MultiSelectItem } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import { ArrayItemQueryRows, ProfileFormData } from '@/lib/definitions';

interface ProfileFormPositionInputProps {
  positionSelectItems: ArrayItemQueryRows[];
}

const ProfileFormPositionInput = ({
  positionSelectItems,
}: ProfileFormPositionInputProps) => {
  const router = useRouter();
  const {
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useFormContext<ProfileFormData>();
  const { positions } = watch();

  const onChange = (values: string[]) => {
    setValue('positions', values);
  };

  const onClick = () => {
    if (!positions || positions.length === 0) {
      setError('positions', {
        type: 'required',
        message: '최소 하나의 구직 포지션을 선택해주세요.',
      });
      return;
    } else {
      router.push('/profile-form?stage=' + '기술');
    }
  };

  return (
    <>
      <div className="w-full">
        <label htmlFor="positions">구직중인 포지션</label>
        <MultiSelect
          className=""
          placeholder="선택해주세요. "
          defaultValue={[]}
          value={positions}
          onValueChange={onChange}
          error={!!errors.positions}
          errorMessage={errors.positions && errors.positions.message}
        >
          {positionSelectItems.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
      </div>
      <Button className="w-full" type="button" onClick={onClick}>
        다음
      </Button>
    </>
  );
};

export default ProfileFormPositionInput;
