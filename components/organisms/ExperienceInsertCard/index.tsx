'use client';

import { Card } from '@tremor/react';
import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { ExperienceFormData } from '@/lib/definitions';
import { insertExperience } from '@/lib/actions';

const ExperienceForm = dynamic(
  () => import('@/components/molecules/ExperienceForm')
);

interface ExperienceInsertCardProps {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}

const ExperienceInsertCard = ({
  positionSelectItems,
  skillsSelectItems
}: ExperienceInsertCardProps) => {
  const [addClicked, setAddClicked] = useState(false);

  const methods = useForm<ExperienceFormData>();

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const result = await insertExperience(data);
      if (result === 'success') {
        alert('업무 경험 추가 성공');
        return window.location.replace('/my-profile/edit-experiences');
      }
      alert('업무 경험 추가 실패');
      return;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider {...methods}>
      <Card
        className="w-full mx-auto mt-4 cursor-pointer flex justify-center items-center"
        onClick={() => setAddClicked(true)}
      >
        {!addClicked && <PlusIcon className="w-6 h-6" />}
        {addClicked && (
          <ExperienceForm
            action={action}
            positionSelectItems={positionSelectItems}
            skillsSelectItems={skillsSelectItems}
          />
        )}
      </Card>
    </FormProvider>
  );
};

export default ExperienceInsertCard;
