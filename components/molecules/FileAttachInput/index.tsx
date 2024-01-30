'use client';

import { Button } from '@tremor/react';
import { useState } from 'react';

interface FileAttachInputProps {
  attachmentFiles?: string[];
}

const FileAttachInput = ({}: FileAttachInputProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 1024 * 1024 * 4) {
      alert('4MB 이하의 파일만 업로드 가능합니다.');
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
        alert('업로드 성공');
        window.location.reload();
      } else {
        alert('업로드 실패');
        return;
      }
    } catch (error) {
      alert('업로드 실패');
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
