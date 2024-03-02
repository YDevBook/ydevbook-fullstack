import LoginForm from '@/components/organisms/LoginForm';
import MobileOnlyTemplate from '@/components/templates/MobileOnlyTemplate';

export default function StartupLoginPage() {
  return (
    <MobileOnlyTemplate className="min-h-[calc(100vh-112px)] flex flex-col justify-center">
      <LoginForm isStartup />
    </MobileOnlyTemplate>
  );
}
