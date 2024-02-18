import { Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

import { auth } from '@/auth';
import ProfileShortIntroUpdateForm from '@/components/organisms/ProfileShortIntroUpdateForm';
import { Profile } from '@/lib/definitions';

export default async function MyProfileEditShortIntroPage() {
  noStore();
  const session = await auth();
  let profile = {} as Profile;
  try {
    const profilePromise = sql.query<Profile>(`
      SELECT * FROM profiles WHERE "userId" = '${session?.user.id}';
    `);
    const [profileQueryResults] = await Promise.all([profilePromise]);
    profile = profileQueryResults.rows[0];
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>간편 이력 수정</Title>
      <ProfileShortIntroUpdateForm profile={profile} />
    </main>
  );
}
