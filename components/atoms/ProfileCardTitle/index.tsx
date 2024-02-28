interface ProfileCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ProfileCardTitle = ({ children, className }: ProfileCardTitleProps) => {
  return (
    <span className={`text-lg font-extrabold ${className}`}>{children}</span>
  );
};

export default ProfileCardTitle;
