'use client';

import { Button, Dialog, DialogPanel, Title } from '@tremor/react';
import { ReactNode, createContext, useState } from 'react';

interface NotificationContextProps {
  content?: string | ReactNode;
  type?: 'error' | 'success';
  confirmText?: string;
  setIsOpen?: (open: boolean) => void;
  setContent?: (content: string | ReactNode) => void;
  setType?: (type: 'error' | 'success') => void;
  setConfirmText?: (text: string) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({});

export const NotificationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<string | ReactNode>('');
  const [type, setType] = useState<'error' | 'success'>('success');
  const [confirmText, setConfirmText] = useState<string>('OK');

  return (
    <NotificationContext.Provider
      value={{
        content,
        type,
        confirmText,
        setIsOpen,
        setContent,
        setType,
        setConfirmText
      }}
    >
      {children}
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title>{content}</Title>
          <div>
            <Button onClick={() => setIsOpen(false)} variant="light">
              {confirmText}
            </Button>
          </div>
        </DialogPanel>
      </Dialog>
    </NotificationContext.Provider>
  );
};
