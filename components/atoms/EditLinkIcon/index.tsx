'use client';

import { RiPencilLine } from '@remixicon/react';
import { Icon } from '@tremor/react';
import Link from 'next/link';

interface EditLinkIconProps {
  href: string;
}

const EditLinkIcon = ({ href }: EditLinkIconProps) => {
  return (
    <Link
      href={href}
      className="absolute top-0 right-0 m-4 hover:bg-gray-100 rounded-md"
    >
      <Icon icon={RiPencilLine} />
    </Link>
  );
};

export default EditLinkIcon;
