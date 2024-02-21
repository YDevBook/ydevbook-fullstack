interface MainPageTemplateProps {
  children?: React.ReactNode;
}

const MainPageTemplate = ({ children }: MainPageTemplateProps) => {
  return (
    <main className="p-4 sm:p-10 mx-auto max-w-7xl min-h-[calc(100%-64px)]">
      {children}
    </main>
  );
};

export default MainPageTemplate;
