'use client';

import clsx from 'clsx';

interface BadgeSelectItemProps {
  label: string;
  value: string;
  iconSrc?: string;
  clicked?: boolean;
  onClick?: (value: string, prevSelected?: boolean) => void;
}

const BadgeSelectItem = ({
  label,
  value,
  iconSrc,
  clicked,
  onClick,
}: BadgeSelectItemProps) => {
  return (
    <div
      className={clsx(
        'border-2 border-gray-200 m-1 px-3 rounded-2xl text-[14px] text-gray-400 bg-gray-200 font-extrabold whitespace-pre h-8 flex items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-white hover:border-ydevbook hover:text-ydevbook',
        clicked && 'bg-white border-ydevbook text-ydevbook'
      )}
      onClick={() => onClick?.(value, clicked)}
    >
      {!!iconSrc && <span className="text-xs mr-2">{iconSrc}</span>}
      {label}
    </div>
  );
};

export default BadgeSelectItem;
