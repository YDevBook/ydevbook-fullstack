'use client';

import clsx from 'clsx';

interface BadgeSelectItemProps {
  label: string;
  value: string;
  iconSrc?: string;
  clicked?: boolean;
  onClick?: (value: string, prevSelected?: boolean) => void;
  readonly?: boolean;
}

const BadgeSelectItem = ({
  label,
  value,
  iconSrc,
  clicked,
  onClick,
  readonly,
}: BadgeSelectItemProps) => {
  return (
    <div
      className={clsx(
        'border-2 m-1 px-3 rounded-2xl text-[14px] font-extrabold whitespace-pre h-8 flex items-center',
        (readonly || clicked) && 'bg-white border-ydevbook text-ydevbook',
        !readonly &&
          'border-gray-200 text-gray-400 bg-gray-200 cursor-pointer transition-all duration-300 ease-in-out',
        readonly && 'bg-white border-ydevbook text-ydevbook'
      )}
      onClick={() => onClick?.(value, clicked)}
    >
      {!!iconSrc && <span className="text-xs mr-2">{iconSrc}</span>}
      {label}
    </div>
  );
};

export default BadgeSelectItem;
