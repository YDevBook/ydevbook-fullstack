import { Title } from '@tremor/react';
import ExperienceInsertCard from '@/components/organisms/ExperienceInsertCard';
import ExperienceUpdateCard from '@/components/organisms/ExperienceUpdateCard';
import { Experience, ArrayItemQueryRows } from '@/lib/definitions';

interface ExperiencesUpdateProps {
  experiences: Experience[];
  positionSelectItems: ArrayItemQueryRows[];
  skillsSelectItems: ArrayItemQueryRows[];
}

const ExperiencesUpdate = ({
  experiences,
  positionSelectItems,
  skillsSelectItems,
}: ExperiencesUpdateProps) => {
  return (
    <div>
      <Title>업무 경험 수정 및 추가</Title>
      {!!experiences &&
        experiences.length > 0 &&
        experiences.map((experience) => (
          <ExperienceUpdateCard
            experience={experience}
            key={experience.id}
            positionSelectItems={positionSelectItems}
            skillsSelectItems={skillsSelectItems}
          />
        ))}
      <ExperienceInsertCard
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </div>
  );
};

export default ExperiencesUpdate;
