'use client';

import { Badge, Card, Divider, Text, Title } from '@tremor/react';

import EditLinkIcon from '@/components/atoms/EditLinkIcon';
import { Experience, ProfileEditParams } from '@/lib/definitions';

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
            <div className="my-1">
              {experience.skills?.map((skill) => (
                <Badge size="sm" color="slate" className="mx-1 " key={skill}>
                  {skill}
                </Badge>
              ))}
            </div>
            <Text className="text-xl">{experience.description}</Text>
          </div>
        ))}

        <EditLinkIcon href={`/my-profile?edit=${ProfileEditParams.경력}`} />
      </Card>
    </div>
  );
};

export default ExperiencesCard;
