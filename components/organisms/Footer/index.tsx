import { RiMailLine } from '@remixicon/react';
import Image from 'next/image';
import YDevBookLogoFooter from '@/assets/images/ydevbook-logo-footer.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      <div className="mx-auto max-w-[640px] px-4 sm:max-w-7xl sm:p-10">
        <div>
          <Image
            src={YDevBookLogoFooter}
            alt="ydevbook footer logo"
            width={144}
            className="rounded-md"
          />
        </div>
        <div className="mt-12 text-md font-medium text-gray-700 space-x-10">
          <a href="/">이용약관</a>
          <a href="/">개인정보 처리방침</a>
          <a href="/">문의하기</a>
          <a
            // className="text-2xl font-semibold"
            href="mailto:contact@developool.com"
          >
            <RiMailLine className="inline-block mr-1 w-4 h-4" />
            contact@developool.com
          </a>
        </div>
        <div className="mt-8">
          <p className="text-xl font-semibold text-gray-900">
            연뎁북은 대학생 개발자들이 만들어 나가고 있습니다 :)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
