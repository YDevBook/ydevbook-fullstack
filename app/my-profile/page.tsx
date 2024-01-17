import { auth } from '@/auth';
import { Title, Text } from '@tremor/react';
import { sql } from '@vercel/postgres';

export default async function MyProfilePage() {
  const session = await auth();
  const { rows } = await sql`
    SELECT * FROM profiles WHERE userId = ${session?.user.id};
  `;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>My Profile</Title>
      <Text>My Profile</Text>
      <div>{JSON.stringify(rows[0])}</div>
    </main>
  );
}
