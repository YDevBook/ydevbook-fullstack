'use client';

import { NotificationContext } from '@/contexts/NotificationContext';
import { updateProfileText } from '@/lib/actions';
import { Button, Textarea } from '@tremor/react';
import { useContext } from 'react';

const ProfileTextUpdateForm = ({
  columnName,
  defaultValue
}: {
  columnName: string;
  defaultValue?: string;
}) => {
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const updateAction = async (formData: FormData) => {
    try {
      const response = await updateProfileText(formData, columnName);
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '프로필을 수정했습니다.',
          onConfirm: () => window.location.replace('/my-profile')
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '프로필 수정에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
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
