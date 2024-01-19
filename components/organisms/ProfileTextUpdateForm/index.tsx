'use client';

import { Button } from '@/components/atoms/Button';
import { updateProfileText } from '@/lib/actions';
import { Textarea } from '@tremor/react';
import { useRouter } from 'next/navigation';

const ProfileTextUpdateForm = ({ columnName }: { columnName: string }) => {
  const router = useRouter();
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
      return router.push('/my-profile');
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
        />
      </div>
      <Button className="mt-4">저장하기</Button>
    </form>
  );
};

export default ProfileTextUpdateForm;
