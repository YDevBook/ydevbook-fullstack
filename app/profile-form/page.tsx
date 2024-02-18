import { sql } from '@vercel/postgres';

import ProfileForm from '@/components/organisms/ProfileForm';
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
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <ProfileForm
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </main>
  );
}
