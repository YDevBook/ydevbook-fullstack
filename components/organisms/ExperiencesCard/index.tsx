'use client';
import { Button } from '@/components/atoms/Button';
import { Experience } from '@/lib/definitions';
import { Card, Divider, Text, Title } from '@tremor/react';
import Link from 'next/link';

interface ExperiencesCardProps {
  experiences: Experience[];
}

const ExperiencesCard = ({ experiences }: ExperiencesCardProps) => {
  return (
    <div>
      <Card className="w-full mx-auto mt-4">
        <Title>경력</Title>
        {experiences.length === 0 && <Text>업무 경험을 추가해주세요.</Text>}
        {experiences.map((experience) => (
          <div key={experience.id}>
            <Divider />
            <Text>{experience.companyName}</Text>
            <Text>{experience.position}</Text>
            <Text>
              {experience.startDate.toDateString()} ~{' '}
              {experience.endDate?.toDateString()}
            </Text>
            <Text className="text-xl">{experience.description}</Text>
          </div>
        ))}

        <Link href="/my-profile/edit-experiences">
          <Button className="absolute top-0 right-0 m-4">수정하기</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ExperiencesCard;
