import { Experience } from '@/lib/definitions';

interface ExperienceUpdateCardProps {
  experience: Experience;
}

const ExperienceUpdateCard = ({ experience }: ExperienceUpdateCardProps) => {
  return <div>{JSON.stringify(experience)}</div>;
};

export default ExperienceUpdateCard;
