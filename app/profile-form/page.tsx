import ProfileForm from '@/components/organisms/ProfileForm';
import { Title, Text } from '@tremor/react';
import { Query, sql } from '@vercel/postgres';

interface QueryRows {
  name: string;
}

export default async function ProfileFormPage() {
  let positionSelectItems = [] as QueryRows[];
  let skillsSelectItems = [] as QueryRows[];
  try {
    const positionsSelectItemsPromise = sql<QueryRows>`
      SELECT * FROM positions;
    `;
    const skillsSelectItemsPromise = sql<QueryRows>`
      SELECT * FROM skills;
    `;

    const [positionsQueryResults, skillsQueryResults] = await Promise.all([
      positionsSelectItemsPromise,
      skillsSelectItemsPromise
    ]);
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>ProfileForm</Title>
      <Text>ProfileForm</Text>
      <ProfileForm
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </main>
  );
}
