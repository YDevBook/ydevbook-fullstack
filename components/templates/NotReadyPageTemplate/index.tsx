import MainPageComponent from '@/components/templates/MainPageComponent';
import { Title } from '@tremor/react';

const NotReadyPageTemplate = () => {
  return (
    <MainPageComponent>
      <div className="h-full flex justify-center items-center">
        <Title>준비 중입니다.</Title>
      </div>
    </MainPageComponent>
  );
};

export default NotReadyPageTemplate;