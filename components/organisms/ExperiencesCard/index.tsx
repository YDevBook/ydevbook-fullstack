'use client';
import { Button } from '@/components/atoms/Button';
import { Experience } from '@/lib/definitions';
import { Card, Text, Title } from '@tremor/react';
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

        <Link href="/my-profile/edit-experiences">
          <Button className="absolute top-0 right-0 m-4">수정하기</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ExperiencesCard;
