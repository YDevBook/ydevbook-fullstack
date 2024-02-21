import { Title } from '@tremor/react';

import MainPageTemlpate from '@/components/templates/MainPageTemplate';

const NotReadyPageTemplate = () => {
  return (
    <MainPageTemlpate>
      <div className="h-full flex justify-center items-center">
        <Title>준비 중입니다.</Title>
      </div>
    </MainPageTemlpate>
  );
};

export default NotReadyPageTemplate;
