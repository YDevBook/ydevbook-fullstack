'use client';

import { Button, Dialog, DialogPanel, Title, Text } from '@tremor/react';
import { ReactNode, createContext, useState } from 'react';

interface NotificationContent {
  title?: string;
  description: ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

interface NotificationContextProps {
  type?: 'error' | 'alert';
  content?: NotificationContent;
  setIsOpen?: (open: boolean) => void;
  setType?: (type: 'error' | 'alert') => void;
  setContent?: (content: NotificationContent) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({});

export const NotificationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<NotificationContent>({
    description: ''
  });
  const [type, setType] = useState<'error' | 'alert'>('alert');

  // TODO: 에러, 경고, 알림 등의 타입에 따라 색깔 다른 컴포넌트를 렌더링하도록 구현
  return (
    <NotificationContext.Provider
      value={{
        content,
        type,
        setIsOpen,
        setContent,
        setType
      }}
    >
      {children}
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <Title>
            {content.title || (type === 'alert' ? 'Alert' : 'Error')}
          </Title>
          <Text className="mt-4">{content.description}</Text>
          <div className="mt-4">
            <Button
              onClick={() => {
                setIsOpen(false);
                content.onConfirm?.();
              }}
            >
              {content.confirmText || '확인'}
            </Button>
            {!!content.onCancel && (
              <span className="pl-2">
                <Button
                  className="ml-4"
                  onClick={() => {
                    setIsOpen(false);
                    content.onCancel?.();
                  }}
                  variant="secondary"
                >
                  {content.cancelText || '취소'}
                </Button>
              </span>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </NotificationContext.Provider>
  );
};
