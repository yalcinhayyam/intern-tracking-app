import { SideBar } from "@/components/SideBar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Main>{children}</Main>
    </>
  );
}

function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className="container mx-auto min-h-screen flex py-5">
      <SideBar />
      <div className="flex-1 p-4 h-[1000px]">
        {children}
        <span className="ml-2 text-sm tracking-wide truncate">Clients</span>
      </div>
    </main>
  );
}
