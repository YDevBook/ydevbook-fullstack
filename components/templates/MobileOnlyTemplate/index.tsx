import { clsx } from 'clsx';

interface MobileOnlyTemplateProps {
  children?: React.ReactNode;
  className?: string;
}

const MobileOnlyTemplate = ({
  children,
  className,
}: MobileOnlyTemplateProps) => {
  return (
    <main
      className={clsx(
        'mx-auto w-full max-w-[640px] min-h-[calc(100vh-400px)] p-4',
        className
      )}
    >
      {children}
    </main>
  );
};

export default MobileOnlyTemplate;
