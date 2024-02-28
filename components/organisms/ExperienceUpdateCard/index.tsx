'use client';

import { RiPencilLine } from '@remixicon/react';
import { Card } from '@tremor/react';
import { Button } from '@tremor/react';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CardContent from '@/components/molecules/ExperienceCardContent';
import LoadingCard from '@/components/molecules/LoadingCard';
import { NotificationContext } from '@/contexts/NotificationContext';
import { updateExperience } from '@/lib/actions';
import {
  Experience,
  ExperienceFormData,
  ProfileEditParams,
} from '@/lib/definitions';

const ExperienceForm = dynamic(
  () => import('@/components/molecules/ExperienceForm'),
  { loading: () => <LoadingCard /> }
);

interface ExperienceUpdateCardProps {
  experience: Experience;
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}

const ExperienceUpdateCard = ({
  experience,
  positionSelectItems,
  skillsSelectItems,
}: ExperienceUpdateCardProps) => {
  const [addClicked, setAddClicked] = useState(false);
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const methods = useForm<ExperienceFormData>({
    defaultValues: { ...experience, startDate: undefined, endDate: undefined },
  });

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const response = await updateExperience({ ...data, id: experience.id });
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
      <Card className="w-full mx-auto mt-4">
        {!addClicked && (
          <>
            <Button
              className="absolute top-0 right-0 p-2 m-4 rounded-md hover:bg-gray-100"
              variant="light"
              icon={RiPencilLine}
              onClick={() => setAddClicked(true)}
            ></Button>
            <CardContent experience={experience} />
          </>
        )}
        {addClicked && (
          <ExperienceForm
            action={action}
            onCancel={() => setAddClicked(false)}
            positionSelectItems={positionSelectItems}
            skillsSelectItems={skillsSelectItems}
            startDateDefaultValue={experience.startDate}
            endDateDefaultValue={experience.endDate}
          />
        )}
      </Card>
    </FormProvider>
  );
};

export default ExperienceUpdateCard;
