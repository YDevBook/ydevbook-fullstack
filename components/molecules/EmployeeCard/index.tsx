import { Card } from '@tremor/react';
import { Profile } from '@/lib/definitions';

interface EmployeeCardProps {
  profile: Profile;
}

const EmployeeCard = ({ profile }: EmployeeCardProps) => {
  return <Card className="mt-2">{profile.name}</Card>;
};

export default EmployeeCard;
