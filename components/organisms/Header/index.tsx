import Image from 'next/image';
import Link from 'next/link';
import HeaderLogo from '@/assets/images/ydevbook-logo.png';
import HeaderProfileMenu from '@/components/molecules/HeaderProfileMenu';

const navigation = [
  { name: '채용 공고', href: '/positions' },
  { name: '스타트업 서비스', href: '/startup' },
];

const Header = async () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="mx-auto max-w-[640px] px-4 h-[64px] flex justify-between items-center sm:max-w-7xl sm:px-10">
        <Link href="/">
          <div>
            <Image alt="header logo" src={HeaderLogo} width={40} height={40} />
          </div>
        </Link>
        <div className="hidden sm:flex items-center font-medium">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <div className="text-gray-700 hover:font-bold mx-4 py-2">
                {item.name}
              </div>
            </Link>
          ))}
          <HeaderProfileMenu
            menuNavigationsWhenLoggedIn={[
              {
                name: '내 프로필',
                href: '/my-profile',
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
