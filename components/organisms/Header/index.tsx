import Image from 'next/image';
import Link from 'next/link';
import HeaderLogo from '@/assets/images/ydevbook-logo.png';
import HeaderNavDrawer from '@/components/molecules/HeaderNavDrawer';
import HeaderProfileMenu from '@/components/molecules/HeaderProfileMenu';
import TopWIPBanner from '@/components/organisms/TopWIPBanner';

const navigation = [
  { name: '채용 공고', href: '/positions' },
  { name: '스타트업 서비스', href: '/startup' },
];

const drawerNavigation = [{ name: '메인페이지', href: '/' }, ...navigation];

const Header = async () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <TopWIPBanner />
      <div className="relative mx-auto max-w-[640px] px-4 h-[64px] flex justify-between items-center sm:max-w-7xl sm:px-10">
        <HeaderNavDrawer navigation={drawerNavigation} />
        <Link href="/">
          <div className="hidden sm:block">
            <Image alt="header logo" src={HeaderLogo} width={40} height={40} />
          </div>
        </Link>
        <Link
          href="/"
          className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] sm:hidden font-bold text-lg"
        >
          YDevBook
        </Link>
        <div className="flex items-center">
          <div className="hidden sm:flex items-center font-medium">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div className="text-gray-700 hover:font-bold mx-4 py-2">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
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
