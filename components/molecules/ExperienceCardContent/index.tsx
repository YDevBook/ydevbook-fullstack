import { Text, Badge, Button } from '@tremor/react';
import { useState } from 'react';
import { Experience } from '@/lib/definitions';

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

export default CardContent;
