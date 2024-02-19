import { Title } from '@tremor/react';
import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

import ProfileUpdateForm from '@/components/organisms/ProfileUpdateForm';
import MobileOnlyTemplate from '@/components/templates/MobileOnlyTemplate';
import { fetchMyProfile } from '@/lib/data';

export default async function MyProfileEditPage() {
  noStore();
  const { data: profile, status } = await fetchMyProfile();

  if (status === 401) {
    redirect('/login');
  }

  if (status === 404 || !profile) {
    redirect('/profile-form');
  }

  return (
    <MobileOnlyTemplate>
      <Title className="text-xl">프로필 기본 정보 수정</Title>
      <ProfileUpdateForm profile={profile} />
    </MobileOnlyTemplate>
  );
}
