import { Title } from '@tremor/react';
import { sql } from '@vercel/postgres';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import ProfileTextUpdateForm from '@/components/organisms/ProfileTextUpdateForm';
import { ProfileTextData } from '@/lib/definitions';

const MyProfileEditTextPage = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (
    !['personalStatement', 'mainStrength', 'expectationText'].includes(
      (searchParams.column as string) || ''
    )
  )
    return notFound();
  const session = await auth();
  const columnName = searchParams.column as string;
  const { rows } = await sql.query<ProfileTextData>(`
  SELECT "${columnName}" FROM profiles WHERE "userId" = '${session?.user.id}';
`);
  const defaultValue = rows[0][columnName];

  const title = (() => {
    switch (searchParams.column) {
      case 'personalStatement':
        return '자기 소개 입력';
      case 'mainStrength':
        return '주요 강점 입력';
      case 'expectationText':
        return '스타트업에 바라는 점 입력';
      default:
        return '자기 소개 입력';
    }
  })();

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>{title}</Title>
      <ProfileTextUpdateForm
        columnName={columnName}
        defaultValue={defaultValue}
      />
    </main>
  );
};

export default MyProfileEditTextPage;
