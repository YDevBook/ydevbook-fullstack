import { RiShieldUserFill } from '@remixicon/react';
import { Button } from '@tremor/react';
import { sql } from '@vercel/postgres';

import Image from 'next/image';
import Link from 'next/link';
import LandingIPhoneMockupImage2 from '@/assets/images/main-landing-iphone-mockup-2.png';
import LandingIPhoneMockupImage from '@/assets/images/main-landing-iphone-mockup.png';
import { auth } from '@/auth';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ProfileFormStage } from '@/lib/definitions';

export default async function IndexPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  let hasProfile = false;
  if (isLoggedIn) {
    const result = await sql`
      SELECT COUNT(*) FROM profiles WHERE "userId" = ${session.user.id};
    `;
    hasProfile = result.rows[0].count !== '0';
  }
  const mainCTAHref =
    isLoggedIn && hasProfile
      ? '/my-profile'
      : `/profile-form?stage=${ProfileFormStage.포지션}`;

  return (
    <MainPageTemplate className="overflow-hidden">
      <div className="relative flex flex-col justify-center items-center py-24">
        <div className="z-[-1]">
          <div className="absolute top-0 left-1/3 w-[316px] h-[316px] rounded-full bg-[linear-gradient(145deg,rgba(67,40,235,0.27)8.28%,rgba(128,148,254,0.35)94.84%)] [filter:blur(75px)] sm:w-[716px] sm:h-[716px] sm:top-[-40%]"></div>
          <div className="absolute top-1/2 left-0 w-[267px] h-[267px] rounded-full bg-[linear-gradient(180deg,rgba(54,200,230,0.70)0%,rgba(0,133,255,0.13)0.01%,rgba(0,133,255,0.29)100%)] [filter:blur(75px)] sm:w-[606px] sm:h-[606px] sm:top-1/3"></div>
          <div className="absolute top-1/2 left-1/3 w-[231px] h-[231px] rounded-full bg-[linear-gradient(151deg,rgba(165,209,246,0.39)7.98%,rgba(128,148,254,0.35)92.02%)] [filter:blur(75px)] sm:w-[521px] sm:h-[521px] sm:left-1/2 "></div>
        </div>
        <p className="my-4 text-xs sm:text-xl">
          대학생 개발자에서 스타트업 팀 합류까지 YDevBook과 함께
        </p>
        <h1 className="text-[28px] leading-[39px] font-bold text-center whitespace-pre-line sm:text-6xl sm:leading-normal">
          간편한 프로필 등록만으로 <br />
          스타트업 개발직 제안 받기
        </h1>
        <Link href={mainCTAHref}>
          <Button className="mt-8 !rounded-full" size="lg">
            프로필 등록하고 제의 받기!
          </Button>
        </Link>
        <Link href="/startup" className="mt-4 underline text-sm">
          스타트업이신가요?
        </Link>
      </div>
      <div className="w-full py-24">
        <p className="w-full text-center font-semibold text-[18px] leading-normal sm:text-[35px]">
          스타트업과 함께하고 싶은 대학생 개발자, <br />
          유망한 대학생이 필요한 스타트업. <br />
          YDevBook이 그 사이를 연결합니다.
        </p>
      </div>
      <div className="my-24 mx-4 flex flex-col md:flex-row md:items-center md:justify-evenly">
        <div className="flex-shrink-0">
          <div className="flex items-center">
            <RiShieldUserFill color="#4328EB" className="w-5 mr-1 sm:w-6" />
            <span className="text-[14px] text-ydevbook sm:text-[21px]">
              프로필 등록
            </span>
          </div>
          <p className="text-[28px] leading-[39px] font-bold sm:text-6xl sm:leading-normal">
            스타트업 합류까지
            <br /> 필요한건 오직
            <br /> 다섯단계.
          </p>
          <p className="my-4 w-2/3 font-extralight text-[14px] sm:text-[18px]">
            포트폴리오 작성 등 기존의 복잡했던 과정이 간단하게 줄어듭니다.
            <br />
            <br />
            5가지 질문에 대해 답하고 나의 프로필을 등록해보세요!
          </p>
        </div>
        <div className="mx-8 my-10">
          <Image
            src={LandingIPhoneMockupImage}
            alt="landing-image-1"
            className="w-[240px] sm:w-[332px] mx-auto"
          />
        </div>
      </div>
      <div className="my-24 mx-4 flex flex-col md:flex-row-reverse md:items-center md:justify-evenly">
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex items-center">
            <RiShieldUserFill color="#4328EB" className="w-5 mr-1 sm:w-6" />
            <span className="text-[14px] text-ydevbook sm:text-[21px]">
              스타트업 제의
            </span>
          </div>
          <p className="text-[28px] leading-[39px] font-bold sm:text-6xl sm:leading-normal text-right">
            당신의 강점이
            <br /> 한눈에
          </p>
          <p className="my-4 font-extralight text-right w-2/3 text-[14px] sm:text-[18px]">
            개발자의 프로필을 보고 스타트업 측에서 컨택을 보내게 됩니다.
            <br />
            나의 강점을 스타트업에 알리고, 제의를 받아보세요!
          </p>
        </div>
        <div className="mx-8 my-10">
          <Image
            src={LandingIPhoneMockupImage2}
            alt="landing-image-1"
            className="w-[240px] sm:w-[332px] mx-auto"
          />
        </div>
      </div>
    </MainPageTemplate>
  );
}
