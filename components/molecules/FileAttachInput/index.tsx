'use client';

import { NotificationContext } from '@/contexts/NotificationContext';
import { Button } from '@tremor/react';
import { useContext, useState } from 'react';

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
        description: '4MB 이하의 파일만 업로드 가능합니다.'
      });
      setIsOpen?.(true);
      return;
    }
    setFiles((prev) => [...prev, file]);
  };

  const fileAttachInputAction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const file = files[0];
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/file?upload-type=attachment-file', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        setContent?.({
          title: 'Success',
          description: '파일을 업로드 했습니다.',
          onConfirm: () => window.location.reload()
        });
        setIsOpen?.(true);
        return;
      } else {
        setContent?.({
          title: 'Error',
          description: '파일 업로드에 실패했습니다.'
        });
        setIsOpen?.(true);
        return;
      }
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '파일 업로드에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
    }
  };

  return (
    <form onSubmit={fileAttachInputAction}>
      {files.map((file) => (
        <div key={file.name}>
          <span>{file.name}</span>
        </div>
      ))}
      <input
        type="file"
        className="hidden"
        name="file"
        id="file"
        onChange={onInputChange}
      />
      <label htmlFor="file">추가하기</label>
      <Button type="submit">업로드</Button>
    </form>
  );
};

export default FileAttachInput;
