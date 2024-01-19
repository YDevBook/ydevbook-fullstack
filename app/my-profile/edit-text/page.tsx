import { Button } from '@/components/atoms/Button';
import ProfileTextUpdateForm from '@/components/organisms/ProfileTextUpdateForm';
import { updateProfileText } from '@/lib/actions';
import { Textarea, Title } from '@tremor/react';
import { notFound } from 'next/navigation';

const MyProfileEditTextPage = ({
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

  const columnName = searchParams.column as string;

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
      <ProfileTextUpdateForm columnName={columnName} />
    </main>
  );
};

export default MyProfileEditTextPage;
