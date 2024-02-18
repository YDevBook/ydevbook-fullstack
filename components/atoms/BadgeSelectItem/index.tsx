'use client';

import { Badge } from '@tremor/react';
import clsx from 'clsx';

interface BadgeSelectItemProps {
  label: string;
  value: string;
  clicked?: boolean;
  onClick?: (value: string, prevSelected?: boolean) => void;
}

const BadgeSelectItem = ({
  label,
  value,
  clicked,
  onClick,
}: BadgeSelectItemProps) => {
  return (
    <Badge
      className={clsx('m-1 bg-white', clicked && 'bg-blue-600 text-white')}
      size="lg"
      onClick={() => onClick?.(value, clicked)}
    >
      {label}
    </Badge>
  );
};

export default BadgeSelectItem;
