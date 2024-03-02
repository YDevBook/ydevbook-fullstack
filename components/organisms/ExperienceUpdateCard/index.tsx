'use client';

import { RiDeleteBinLine, RiPencilLine } from '@remixicon/react';
import { Card } from '@tremor/react';
import { Button } from '@tremor/react';
import dynamic from 'next/dynamic';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import CardContent from '@/components/molecules/ExperienceCardContent';
import LoadingCard from '@/components/molecules/LoadingCard';
import { NotificationContext } from '@/contexts/NotificationContext';
import { deleteExperience, updateExperience } from '@/lib/actions';
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
    defaultValues: { ...experience },
  });

  const handleDeleteClick = () => {
    setContent?.({
      title: 'Delete',
      description: '경력을 삭제하시겠습니까?',
      onConfirm: onDelete,
      onCancel: () => setIsOpen?.(false),
    });
    setIsOpen?.(true);
    return;
  };

  const onDelete = async () => {
    try {
      const response = await deleteExperience(experience.id);
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '경력이 삭제되었습니다.',
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
        description: '경력 삭제에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '경력 삭제에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    }
  };

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const response = await updateExperience({ ...data, id: experience.id });
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '경력이 반영되었습니다.',
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
        description: '경력 추가 및 변경에 실패했습니다.',
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '경력 추가 및 변경에 실패했습니다.',
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
            <div className="absolute top-0 right-0 m-4">
              <Button
                className="rounded-md p-2 hover:bg-gray-100"
                variant="light"
                icon={RiDeleteBinLine}
                onClick={handleDeleteClick}
              />
              <Button
                className="rounded-md p-2 hover:bg-gray-100"
                variant="light"
                icon={RiPencilLine}
                onClick={() => setAddClicked(true)}
              />
            </div>
            <CardContent experience={experience} />
          </>
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

export default ExperienceUpdateCard;
