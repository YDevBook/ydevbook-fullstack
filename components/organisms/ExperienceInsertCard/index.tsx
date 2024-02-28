'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { Card } from '@tremor/react';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import LoadingCard from '@/components/molecules/LoadingCard';
import { NotificationContext } from '@/contexts/NotificationContext';
import { insertExperience } from '@/lib/actions';
import { ExperienceFormData, ProfileEditParams } from '@/lib/definitions';

const ExperienceForm = dynamic(
  () => import('@/components/molecules/ExperienceForm'),
  { loading: () => <LoadingCard /> }
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
        className={clsx(
          'w-full mx-auto mt-4',
          !addClicked && 'p-0 cursor-pointer'
        )}
      >
        {!addClicked && (
          <div
            className="w-full h-full flex justify-center items-center py-10"
            onClick={() => setAddClicked(true)}
          >
            <PlusIcon className="w-6 h-6" />
          </div>
        )}
        {addClicked && (
          <ExperienceForm
            action={action}
            onCancel={() => setAddClicked(false)}
            positionSelectItems={positionSelectItems}
            skillsSelectItems={skillsSelectItems}
          />
        )}
      </Card>
    </FormProvider>
  );
};

export default ExperienceInsertCard;
