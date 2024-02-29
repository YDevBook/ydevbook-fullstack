'use client';

import { Card, Divider, Text } from '@tremor/react';

import EditLinkIcon from '@/components/atoms/EditLinkIcon';
import ProfileCardTitle from '@/components/atoms/ProfileCardTitle';
import CardContent from '@/components/molecules/ExperienceCardContent';
import { Experience, ProfileEditParams } from '@/lib/definitions';

interface ExperiencesCardProps {
  experiences: Experience[];
}

const ExperiencesCard = ({ experiences }: ExperiencesCardProps) => {
  return (
    <div>
      <Card className="w-full mx-auto mt-4">
        <ProfileCardTitle>경력</ProfileCardTitle>
        <div className="mx-4 mt-4">
          {experiences.length === 0 && <Text>업무 경험을 추가해주세요.</Text>}
          {experiences.map((experience, index) => (
            <div key={experience.id}>
              {index !== 0 && <Divider />}
              <CardContent experience={experience} />
            </div>
          ))}
        </div>
        <EditLinkIcon href={`/my-profile?edit=${ProfileEditParams.경력}`} />
      </Card>
    </div>
  );
};

export default ExperiencesCard;
