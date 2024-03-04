import MainPageTemlpate from '@/components/templates/MainPageTemplate';

const NotReadyPageTemplate = ({ pageName }: { pageName?: string }) => {
  return (
    <MainPageTemlpate className="h-[calc(100vh-320px)]">
      <div className="h-full flex flex-col justify-center items-center">
        <p className="text-center text-[18px] font-extrabold">
          현재 {pageName || '이 페이지'}는 기획 중에 있습니다.
          <br /> 빠른 시일 내에 준비하겠습니다! 🙇‍♂️
        </p>
      </div>
    </MainPageTemlpate>
  );
};

export default NotReadyPageTemplate;
