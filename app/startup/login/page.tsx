import LoginForm from '@/components/organisms/LoginForm';

export default function StartupLoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 md:-mt-32 p-4">
        <LoginForm isStartup />
      </div>
    </main>
  );
}
