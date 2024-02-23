import LoginForm from '@/components/organisms/LoginForm';
import MobileOnlyTemplate from '@/components/templates/MobileOnlyTemplate';

export default function StartupLoginPage() {
  return (
    <MobileOnlyTemplate>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 md:-mt-32 p-4">
        <LoginForm isStartup />
      </div>
    </MobileOnlyTemplate>
  );
}
