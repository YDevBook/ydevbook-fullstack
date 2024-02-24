import { sql } from '@vercel/postgres';

import { redirect } from 'next/navigation';
import ProfileForm from '@/components/organisms/ProfileForm';
import ProfileFormStageHeader from '@/components/organisms/ProfileFormStageHeader';
import MobileOnlyTemplate from '@/components/templates/MobileOnlyTemplate';
import { ArrayItemQueryRows, ProfileFormStage } from '@/lib/definitions';

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
  const stage = searchParams?.stage as ProfileFormStage;
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
    <MobileOnlyTemplate className="!h-[calc(100vh-112px)] flex flex-col justify-between">
      <ProfileFormStageHeader stage={stage} />
      <ProfileForm
        positionSelectItems={positionSelectItems}
        skillsSelectItems={skillsSelectItems}
      />
    </MobileOnlyTemplate>
  );
}
