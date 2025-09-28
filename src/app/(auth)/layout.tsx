export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-dvh w-full bg-gray-900 flex items-center justify-center p-4">
      {children}
    </main>
  );
}
