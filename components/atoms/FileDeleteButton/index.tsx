'use client';

import { RiDeleteBinLine } from '@remixicon/react';
import { Button } from '@tremor/react';
import { useContext } from 'react';

import { NotificationContext } from '@/contexts/NotificationContext';

interface FileDeleteButtonProps {
  onDelete: (id: number) => Promise<void>;
  fileId: number;
}

const FileDeleteButton = ({ onDelete, fileId }: FileDeleteButtonProps) => {
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const onClickHandler = () => {
    setContent?.({
      title: 'Delete',
      description: '파일을 삭제하시겠습니까?',
      onConfirm: () => {
        try {
          onDelete(fileId).then(() => {
            setContent?.({
              title: 'Success',
              description: '파일을 삭제했습니다.',
              onConfirm: () => window.location.reload(),
            });
            setIsOpen?.(true);
          });
        } catch (error) {
          setContent?.({
            title: 'Error',
            description: '파일 삭제에 실패했습니다.',
          });
          setIsOpen?.(true);
        }
      },
      confirmText: '삭제',
      onCancel: () => setIsOpen?.(false),
    });
    setIsOpen?.(true);
  };

  return (
    <Button
      variant="light"
      icon={RiDeleteBinLine}
      onClick={onClickHandler}
    ></Button>
  );
};

export default FileDeleteButton;
