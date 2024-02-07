import LoginForm from '@/components/organisms/LoginForm';
import LoginFormOnlyKakao from '@/components/organisms/LoginFormOnlyKakao';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto w-full max-w-[640px] space-y-2.5 md:-mt-32 p-8">
        <LoginFormOnlyKakao />
      </div>
    </main>
  );
}
