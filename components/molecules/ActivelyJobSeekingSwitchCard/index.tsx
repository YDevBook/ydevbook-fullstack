'use client';

import { Card, Title, Switch, Text } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { NotificationContext } from '@/contexts/NotificationContext';

interface ActivelyJobSeekingSwitchCardProps {
  initialIsActive?: boolean;
  onChange?: (isActive: boolean) => void;
}

const ActivelyJobSeekingSwitchCard = ({
  initialIsActive,
  onChange
}: ActivelyJobSeekingSwitchCardProps) => {
  const [isActive, setIsActive] = useState<boolean>(initialIsActive || false);
  const { setContent, setIsOpen } = useContext(NotificationContext);
  const router = useRouter();

  const handleOnChange = useDebouncedCallback(
    (isActive: boolean) => {
      setIsActive(isActive);
      try {
        onChange?.(isActive);
      } catch (error) {
        setContent?.({
          title: 'Error',
          description:
            '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          onConfirm: () => router.refresh()
        });
        setIsOpen?.(true);
        return;
      }
    },
    1000,
    { leading: true }
  );

  return (
    <Card className="w-full mx-auto mt-4">
      <div className="w-full flex justify-between">
        <div>
          <Title>적극 구직 중</Title>
          <Text>토글 Off 시, 구직 중이 아님으로 표시됩니다.(Temp)</Text>
        </div>
        <Switch checked={isActive} onChange={handleOnChange} className="ml-2" />
      </div>
    </Card>
  );
};

export default ActivelyJobSeekingSwitchCard;