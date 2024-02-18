export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      Auth Layout <hr />
      {children}
    </>
  );
}
