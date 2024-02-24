'use client';

import clsx from 'clsx';
import { StaticImageData } from 'next/image';

interface BadgeSelectItemProps {
  label: string;
  value: string;
  iconSrc?: StaticImageData;
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
    <span
      className={clsx(
        'border-2 border-gray-200 m-1 px-4 py-2 rounded-2xl text-[14px] text-gray-400 bg-gray-200 font-extrabold',
        clicked && 'bg-white border-ydevbook text-ydevbook'
      )}
      onClick={() => onClick?.(value, clicked)}
    >
      {/* {!!iconSrc && (
        <Image
          src={iconSrc}
          alt="badge icon"
          width={19}
          height={19}
          className="mr-2"
        />
      )} */}
      💻 {label}
    </span>
  );
};

export default BadgeSelectItem;
