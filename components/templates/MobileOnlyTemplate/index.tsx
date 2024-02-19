interface MobileOnlyTemplateProps {
  children?: React.ReactNode;
}

const MobileOnlyTemplate = ({ children }: MobileOnlyTemplateProps) => {
  return <main className="mx-auto w-full max-w-[640px] p-4">{children}</main>;
};

export default MobileOnlyTemplate;
