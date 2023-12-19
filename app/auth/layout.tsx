export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        Auth Layout <hr />
        {children}
      </body>
    </html>
  );
}
