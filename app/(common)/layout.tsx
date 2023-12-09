export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      Common Layout <hr />
      {children}
    </>
  );
}
