'use client';

import { Badge, Button, Card, Divider, Text } from '@tremor/react';

import { useState } from 'react';
import EditLinkIcon from '@/components/atoms/EditLinkIcon';
import ProfileCardTitle from '@/components/atoms/ProfileCardTitle';
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

const CardContent = ({ experience }: { experience: Experience }) => {
  const [moreClicked, setMoreClicked] = useState(false);
  const descriptionShortEnough = (experience.description?.length || 0) < 200;

  return (
    <>
      <span className="text-[18px] font-extrabold">
        {experience.companyName}
      </span>
      <span className="ml-2">{experience.position}</span>
      <Text>
        {experience.startDate.toDateString()} ~{' '}
        {experience.endDate?.toDateString()}
      </Text>
      <div className="my-1">
        {experience.skills?.map((skill) => (
          <Badge size="sm" className="m-1" key={skill}>
            {skill}
          </Badge>
        ))}
      </div>
      <p className="text-sm whitespace-pre-line">
        {descriptionShortEnough || moreClicked
          ? experience.description + '    '
          : experience.description?.substring(0, 200) + '... '}
        {!descriptionShortEnough && (
          <Button
            size="xs"
            color="gray"
            variant="light"
            className="inline"
            onClick={() => setMoreClicked((prev) => !prev)}
          >
            {moreClicked ? '간략히' : '더 보기'}
          </Button>
        )}
      </p>
    </>
  );
};
