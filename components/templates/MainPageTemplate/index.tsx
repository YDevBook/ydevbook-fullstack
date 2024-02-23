import clsx from 'clsx';

interface MainPageTemplateProps {
  children?: React.ReactNode;
  className?: string;
}

const MainPageTemplate = ({ children, className }: MainPageTemplateProps) => {
  return (
    <main
      className={clsx(
        'p-4 sm:p-10 mx-auto max-w-7xl min-h-[calc(100vh-400px)]',
        className
      )}
    >
      {children}
    </main>
  );
};

export default MainPageTemplate;
