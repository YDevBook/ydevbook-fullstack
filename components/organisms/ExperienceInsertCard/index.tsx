'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Card } from '@tremor/react';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { NotificationContext } from '@/contexts/NotificationContext';
import { insertExperience } from '@/lib/actions';
import { ExperienceFormData, ProfileEditParams } from '@/lib/definitions';

const ExperienceForm = dynamic(
  () => import('@/components/molecules/ExperienceForm')
);

interface ExperienceInsertCardProps {
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}

const ExperienceInsertCard = ({
  positionSelectItems,
  skillsSelectItems,
}: ExperienceInsertCardProps) => {
  const [addClicked, setAddClicked] = useState(false);
  const { setContent, setIsOpen } = useContext(NotificationContext);
  const methods = useForm<ExperienceFormData>();

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const response = await insertExperience(data);
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '업무 경험을 추가했습니다.',
          onConfirm: () =>
            window.location.replace(
              `/my-profile?edit=${ProfileEditParams.경력}`
            ),
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '업무 경험 추가에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '업무 경험 추가에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
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
