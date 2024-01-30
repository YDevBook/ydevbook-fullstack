'use client';

import { Badge, Card, Title } from '@tremor/react';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { FormProvider, useForm } from 'react-hook-form';
import { Experience, ExperienceFormData } from '@/lib/definitions';
import { updateExperience } from '@/lib/actions';
import { Text, Button } from '@tremor/react';

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

  const methods = useForm<ExperienceFormData>({
    defaultValues: { ...experience, startDate: undefined, endDate: undefined }
  });

  const action: () => void = methods.handleSubmit(async (data) => {
    try {
      const result = await updateExperience({ ...data, id: experience.id });
      if (result === 'success') {
        alert('업무 경험 수정 성공');
        return window.location.replace('/my-profile/edit-experiences');
      }
      alert('업무 경험 수정 실패');
      return;
    } catch (error) {
      console.error(error);
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
