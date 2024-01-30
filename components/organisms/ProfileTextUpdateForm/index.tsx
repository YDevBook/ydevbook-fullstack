'use client';

import { updateProfileText } from '@/lib/actions';
import { Button, Textarea } from '@tremor/react';

const ProfileTextUpdateForm = ({
  columnName,
  defaultValue
}: {
  columnName: string;
  defaultValue?: string;
}) => {
  const updateAction = async (formData: FormData) => {
    let result;
    try {
      result = await updateProfileText(formData, columnName);
    } catch (error) {
      console.error(error);
      // alert('프로필 업데이트에 실패했습니다.');
      return;
    }

    if (result === 'success') {
      alert('프로필 업데이트 성공');
      return window.location.replace('/my-profile');
    } else {
      alert('프로필 업데이트 실패');
    }
  };
  return (
    <form action={updateAction} className="my-4">
      <div>
        <Textarea
          id={columnName}
          name={columnName}
          placeholder="Start typing here..."
          className="h-96"
          defaultValue={defaultValue}
        />
      </div>
      <Button className="mt-4">저장하기</Button>
    </form>
  );
};

export default ProfileTextUpdateForm;
