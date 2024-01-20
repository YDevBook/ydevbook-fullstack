'use client';

import { Experience } from '@/lib/definitions';
import { Card } from '@tremor/react';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface ExperienceInsertCardProps {}

const ExperienceInsertCard = ({}: ExperienceInsertCardProps) => {
  const [addClicked, setAddClicked] = useState(false);

  return (
    <Card
      className="w-full mx-auto mt-4 cursor-pointer flex justify-center items-center"
      onClick={() => setAddClicked(true)}
    >
      {!addClicked && <PlusIcon className="w-6 h-6" />}
    </Card>
  );
};

export default ExperienceInsertCard;
