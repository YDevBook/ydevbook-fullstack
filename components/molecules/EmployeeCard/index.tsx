import { Profile } from '@/lib/definitions';
import { Card } from '@tremor/react';

interface EmployeeCardProps {
  profile: Profile;
}

const EmployeeCard = ({ profile }: EmployeeCardProps) => {
  return <Card>{profile.name}</Card>;
};

export default EmployeeCard;
