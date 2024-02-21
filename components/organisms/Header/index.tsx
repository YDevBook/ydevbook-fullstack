import { auth } from '@/auth';

const Header = async () => {
  const session = await auth();

  return (
    <header className="w-full bg-white">
      <div className="mx-auto max-w-[640px] px-4 h-[64px] flex justify-between items-center sm:max-w-7xl sm:px-10">
        Header
      </div>
    </header>
  );
};

export default Header;
