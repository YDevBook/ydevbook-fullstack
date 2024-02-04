'use client';

import { Badge, Card, Title } from '@tremor/react';
import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { Experience, ExperienceFormData } from '@/lib/definitions';
import { updateExperience } from '@/lib/actions';
import { Text, Button } from '@tremor/react';
import { NotificationContext } from '@/contexts/NotificationContext';

const ExperienceForm = dynamic(
  () => import('@/components/molecules/ExperienceForm')
);

interface ExperienceUpdateCardProps {
  experience: Experience;
  positionSelectItems: { name: string }[];
  skillsSelectItems: { name: string }[];
}

const ExperienceUpdateCard = ({
  experience,
  positionSelectItems,
  skillsSelectItems
}: ExperienceUpdateCardProps) => {
  const [addClicked, setAddClicked] = useState(false);
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const methods = useForm<ExperienceFormData>({
    defaultValues: { ...experience, startDate: undefined, endDate: undefined }
  });

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const response = await updateExperience({ ...data, id: experience.id });
      if (response.status === 200) {
        setContent?.({
          title: 'Success',
          description: '업무 경험을 추가했습니다.',
          onConfirm: () =>
            window.location.replace('/my-profile/edit-experiences')
        });
        setIsOpen?.(true);
        return;
      }
      setContent?.({
        title: 'Error',
        description: '업무 경험 추가에 실패했습니다.'
      });
      setIsOpen?.(true);
      return;
    } catch (error) {
      setContent?.({
        title: 'Error',
        description: '업무 경험 추가에 실패했습니다.'
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
              className="absolute top-0 right-0 m-4"
              onClick={() => setAddClicked(true)}
            >
              수정하기
            </Button>
            <Text>회사명</Text>
            <Title>{experience.companyName}</Title>
            <Text>직책</Text>
            <Title>{experience.position}</Title>
            <Text>시작일</Text>
            <Title>{experience.startDate.toDateString()}</Title>
            <Text>종료일</Text>
            <Title>{experience.endDate?.toDateString()}</Title>
            <Text>현재 근무 여부</Text>
            <Title>{experience.isWorkingNow ? 'O' : 'X'}</Title>
            <Text>사용 기술</Text>
            <div className="my-2">
              {experience.skills?.map((skill) => (
                <Badge size="xl" color="slate" className="mx-1 " key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
            <Text>업무 내용</Text>
            <Text className="text-xl">{experience.description}</Text>
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
