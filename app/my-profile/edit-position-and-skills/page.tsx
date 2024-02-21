import { Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { auth } from '@/auth';
import ProfilePositionAndSkillUpdateForm from '@/components/organisms/ProfilePositionAndSkillUpdateForm';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ArrayItemQueryRows, Profile } from '@/lib/definitions';

export default async function MyProfileEditSkillsPage() {
  noStore();

  const session = await auth();
  let profile = {} as Profile;
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];

  try {
    const profilePromise = sql.query<Profile>(`
    SELECT * FROM profiles WHERE "userId" = '${session?.user.id}';
  `);
    const positionsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM positions;
    `;
    const skillsSelectItemsPromise = sql<ArrayItemQueryRows>`
      SELECT * FROM skills;
    `;

    const [profileQueryResults, positionsQueryResults, skillsQueryResults] =
      await Promise.all([
        profilePromise,
        positionsSelectItemsPromise,
        skillsSelectItemsPromise,
      ]);

    profile = profileQueryResults.rows[0];
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  return (
    <MainPageTemplate>
      <Title>포지션 및 기술 스택 수정</Title>
      <ProfilePositionAndSkillUpdateForm
        profile={profile}
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </MainPageTemplate>
  );
}
