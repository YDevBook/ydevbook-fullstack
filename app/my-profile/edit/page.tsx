import { auth } from '@/auth';
import ProfileUpdateForm from '@/components/organisms/ProfileUpdateForm';
import { ArrayItemQueryRows, Profile } from '@/lib/definitions';
import { Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

export default async function MyProfileEditPage() {
  noStore();
  const session = await auth();
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];
  let profile = {} as Profile;

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
        skillsSelectItemsPromise
      ]);

    if (profileQueryResults.rows.length === 0) {
      redirect('/profile-form');
    }

    profile = profileQueryResults.rows[0];
    positionSelectItems = positionsQueryResults.rows;
    skillsSelectItems = skillsQueryResults.rows;
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>프로필 기본 정보 수정</Title>
      <ProfileUpdateForm
        profile={profile}
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </main>
  );
}
