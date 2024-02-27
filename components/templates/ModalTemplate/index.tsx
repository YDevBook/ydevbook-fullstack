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
    <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 p-4 sm:p-10 z-30 flex justify-center items-center">
      <div className="w-full max-h-full max-w-2xl rounded-2xl bg-white p-4 sm:p-10 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
