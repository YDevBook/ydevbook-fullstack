import Link from 'next/link';
import MainPageTemplate from '@/components/templates/MainPageTemplate';

export default function StartupLandingPage() {
  const mainCTAHref = '/startup/developer-list';

  return (
    <MainPageTemplate>
      <div className="flex flex-col justify-center items-center my-24">
        <h1 className="text-2xl font-bold  text-center whitespace-pre-line sm:text-4xl sm:leading-normal">
          스타트업 계정 신청하고, <br />
          검증된 학력의 개발자에게 컨택해보세요.
        </h1>
        <p className="mt-8 text-lg text-gray-700 sm:text-xl">
          열정있는 대학생 개발자들의 프로필을 확인해보세요.
        </p>
        <Link
          href={mainCTAHref}
          className="mt-8 px-8 py-2 bg-blue-500 text-white rounded-md"
        >
          개발자 풀 보러가기
        </Link>
      </div>
    </MainPageTemplate>
  );
}
