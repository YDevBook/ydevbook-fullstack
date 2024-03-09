'use client';

import { RiQuestionLine } from '@remixicon/react';
import { Card, Icon, Switch } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

import ProfileCardTitle from '@/components/atoms/ProfileCardTitle';
import { NotificationContext } from '@/contexts/NotificationContext';

interface ActivelyJobSeekingSwitchCardProps {
  initialIsActive?: boolean;
  onChange?: (isActive: boolean) => void;
}

const ActivelyJobSeekingSwitchCard = ({
  initialIsActive,
  onChange,
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
          onConfirm: () => router.refresh(),
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
      <div className="w-full flex justify-between items-center">
        <div className="flex">
          <ProfileCardTitle>적극 구직 중</ProfileCardTitle>
          <Icon
            icon={RiQuestionLine}
            className="ml-2 p-0"
            color="gray"
            tooltip="토글 off 시, 내 개인정보가 노출되지 않습니다."
          />
        </div>
        <Switch
          checked={isActive}
          onChange={handleOnChange}
          className="ml-2 flex items-center"
        />
      </div>
    </Card>
  );
};

export default ActivelyJobSeekingSwitchCard;
