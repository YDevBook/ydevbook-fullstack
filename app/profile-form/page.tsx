import { sql } from '@vercel/postgres';

import { redirect } from 'next/navigation';
import ProfileForm from '@/components/organisms/ProfileForm';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ArrayItemQueryRows } from '@/lib/definitions';

interface ProfileFormPageProps {
  searchParams?: {
    stage?: string;
  };
}

export default async function ProfileFormPage({
  searchParams,
}: ProfileFormPageProps) {
  let positionSelectItems = [] as ArrayItemQueryRows[];
  let skillsSelectItems = [] as ArrayItemQueryRows[];
  const stage = searchParams?.stage;
  if (!stage) {
    redirect('/profile-form?stage=%ED%8F%AC%EC%A7%80%EC%85%98');
  }

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
