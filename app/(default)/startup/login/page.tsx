import LoginForm from '@/components/organisms/LoginForm';
import MobileOnlyTemplate from '@/components/templates/MobileOnlyTemplate';

export default function StartupLoginPage() {
  return (
    <MobileOnlyTemplate>
      <LoginForm isStartup />
    </MobileOnlyTemplate>
  );
}
