import { RiKakaoTalkFill, RiMailLine } from '@remixicon/react';
import Image from 'next/image';
import YDevBookLogo from '@/assets/images/ydevbook-logo.png';

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t">
      <div className="mx-auto max-w-[640px] p-4 sm:max-w-7xl sm:p-10 flex flex-col items-center sm:flex-row sm:items-start">
        <div className="flex items-center mb-8">
          <div>
            <Image
              src={YDevBookLogo}
              alt="ydevbook footer logo"
              width={30}
              className="rounded-md"
            />
          </div>
          <div className="ml-4 font-bold text-lg leading-normal">YDevBook</div>
        </div>
        <div className="sm:ml-12 sm:flex-grow">
          <div className="flex justify-center text-sm leading-loose space-x-6 sm:text-[16px] sm:justify-start">
            <a href="/agreements" target="_blank">
              이용약관
            </a>
            <a href="/privacy" target="_blank">
              개인정보 처리방침
            </a>
            <a
              href="https://open.kakao.com/o/sZAjuvdg"
              target="_blank noopener noreferrer"
            >
              문의하기
            </a>
          </div>
          <div className="mt-8 text-sm text-center sm:text-left">
            <p className=" text-gray-500">
              YDevBook <br />
              문의: contact@developool.com | 대표: 서현우
            </p>
            <p className="mt-2 font-semibold text-gray-500">
              연뎁북은 대학생 개발자들이 만들어 나가고 있습니다 :)
            </p>
          </div>
        </div>
        <div className="flex mt-6 sm:mt-0">
          <a
            // className="text-2xl font-semibold"
            href="mailto:contact@developool.com"
          >
            <RiMailLine className="inline-block w-8" />
          </a>
          <a
            // className="text-2xl font-semibold"
            href="https://open.kakao.com/o/sZAjuvdg"
            target="_blank noopener noreferrer"
          >
            <RiKakaoTalkFill className="inline-block w-8" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
