import LoginFormOnlyKakao from '@/components/organisms/LoginFormOnlyKakao';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-112px)]">
      <div className="relative mx-auto w-full max-w-[640px] md:-mt-32 p-8">
        <LoginFormOnlyKakao />
      </div>
    </main>
  );
}
