import { sql } from '@vercel/postgres';

import ProfileForm from '@/components/organisms/ProfileForm';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ArrayItemQueryRows } from '@/lib/definitions';

export default async function ProfileFormPage() {
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];
  try {
    const positionsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM positions;
    `;
    const skillsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM skills;
    `;

    const [positionsQueryResults, skillsQueryResults] = await Promise.all([
      positionsSelectItemsPromise,
      skillsSelectItemsPromise,
    ]);
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  return (
    <MainPageTemplate>
      <ProfileForm
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </MainPageTemplate>
  );
}
