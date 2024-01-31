interface MainPageComponentProps {
  children?: React.ReactNode;
}

const MainPageComponent = ({ children }: MainPageComponentProps) => {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl h-[calc(100%-64px)]">
      {children}
    </main>
  );
};

export default MainPageComponent;
