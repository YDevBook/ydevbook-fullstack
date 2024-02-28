'use client';

import { useEffect } from 'react';

interface ModalTemplateProps {
  children: React.ReactNode;
}

const ModalTemplate = ({ children }: ModalTemplateProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  return (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen p-4 bg-black/70 sm:p-10">
      <div className="w-full max-w-2xl max-h-[calc(100%-80px)] p-4 mb-20 overflow-scroll bg-white rounded-2xl sm:p-10">
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
