'use client';

import { Badge, Button } from '@tremor/react';
import { useContext, useState } from 'react';

import { NotificationContext } from '@/contexts/NotificationContext';

interface FileAttachInputProps {
  attachmentFiles?: string[];
}

const FileAttachInput = ({}: FileAttachInputProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 4) {
      setContent?.({
        title: 'Error',
        description: '4MB 이하의 파일만 업로드 가능합니다.',
      });
      setIsOpen?.(true);
      return;
    }
    setFiles([...files, file]);
    fileAttachInputAction(file);
  };

  const fileAttachInputAction = async (file: File) => {
    try {
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/file?upload-type=attachment-file', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setContent?.({
          title: 'Success',
          description: '파일을 업로드 했습니다.',
          onConfirm: () => window.location.reload(),
        });
        setIsOpen?.(true);
        return;
      } else {
        setContent?.({
          title: 'Error',
          description: '파일 업로드에 실패했습니다.',
        });
        setIsOpen?.(true);
        return;
      }
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '파일 업로드에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  };

  return (
    <div>
      {files.map((file) => (
        <div key={file.name}>
          <span>{file.name}</span>
          <Badge className="ml-2">업로드 중</Badge>
        </div>
      ))}
      <input
        type="file"
        className="hidden"
        name="file"
        id="file"
        onChange={onInputChange}
      />
      <Button className="p-0 mt-4">
        <label className="inline-block px-4 py-2 cursor-pointer" htmlFor="file">
          추가하기
        </label>
      </Button>
    </div>
  );
};

export default FileAttachInput;
