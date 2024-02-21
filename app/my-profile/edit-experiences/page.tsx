import { Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { auth } from '@/auth';
import ExperienceInsertCard from '@/components/organisms/ExperienceInsertCard';
import ExperienceUpdateCard from '@/components/organisms/ExperienceUpdateCard';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ArrayItemQueryRows, Experience } from '@/lib/definitions';

export default async function MyProfileEditExperiencesPage() {
  noStore();

  const session = await auth();
  let experiences = [] as Experience[];
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];

  try {
    const experiencesPromise = sql<Experience>`
    SELECT * FROM experiences WHERE "userId" = ${session?.user.id};
  `;
    const positionsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM positions;
    `;
    const skillsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM skills;
    `;

    const [experiencesQueryResults, positionsQueryResults, skillsQueryResults] =
      await Promise.all([
        experiencesPromise,
        positionsSelectItemsPromise,
        skillsSelectItemsPromise,
      ]);

    experiences = experiencesQueryResults.rows;
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  return (
    <MainPageTemplate>
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
    </MainPageTemplate>
  );
}
