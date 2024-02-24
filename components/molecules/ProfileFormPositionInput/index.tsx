'use client';

import { Button } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';

import BadgeSelectItem from '@/components/atoms/BadgeSelectItem';
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

  const onClickBadge = (value: string, prevClicked?: boolean) => {
    if (prevClicked) {
      const newList = positions?.filter((position) => position !== value);
      setValue('positions', newList);
    } else {
      setValue('positions', [...(positions ?? []), value]);
    }
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
        <div className="mt-12">
          <h1 className="text-center text-[23px] font-extrabold  ">
            어떤 개발 업무를 찾고 계신가요?
          </h1>
          <h2 className="mt-4 text-center text-[17px] font-normal text-gray-500">
            구직 중인 포지션을 선택해주세요.
          </h2>
        </div>
        <label className="text-[18px] font-extrabold mt-14 inline-block">
          개발 포지션
        </label>
        <div className="overflow-x-scroll mt-8">
          <div className="w-[500px] flex flex-wrap mb-8">
            {positionSelectItems?.map((position) => (
              <BadgeSelectItem
                key={position.name}
                label={position.name}
                value={position.name}
                clicked={
                  !!positions &&
                  positions?.findIndex((item) => item === position.name) !== -1
                }
                onClick={onClickBadge}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full ">
        {!!errors.positions && (
          <p className="py-4 text-red-400 text-center">
            {errors.positions.message}
          </p>
        )}
        <Button className="w-full" type="button" onClick={onClick}>
          다음
        </Button>
      </div>
    </>
  );
};

export default ProfileFormPositionInput;
