import EmployeeCard from '@/components/molecules/EmployeeCard';
import { fetchFilteredProfile } from '@/lib/data';
import { Title, Text } from '@tremor/react';

export default async function DeveloperListPage() {
  const profiles = await fetchFilteredProfile();
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>DeveloperList</Title>
      <Text>DeveloperList</Text>
      {profiles.map((profile) => (
        <EmployeeCard key={profile.id} profile={profile} />
      ))}
    </main>
  );
}
