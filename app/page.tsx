"use client";
import { CounterContext, CounterContextProvider } from "@/lib/context";
import { useAppDispatch, useAppSelector, incremented } from "@/lib/redux";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WiAlien } from "react-icons/wi";
import FileUploader from "@/lib/components/FileUploader";
import { usePathname, useRouter } from "next/navigation";
export default function Home() {
  const [origin, setOrigin] = useState<string | undefined>(undefined);
  const router = useRouter();
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();
  const context = useContext(CounterContext);
  useEffect(() => {
    // console.log(path);
    setOrigin(location.origin);
    console.log(location.origin);
  }, []);
  if (false)
    return (
      origin && (
        <iframe
          src={`https://docs.google.com/gview?url=${origin}/word.docx&embedded=true`}
          style={{ width: "600px", height: "500px" }}
          frameBorder="0"
        ></iframe>
      )
    );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Component />
      <FileUploader />
      <Link href={"/about"}>About</Link>
      Redux :{" "}
      <Button onClick={() => dispatch(incremented())}> {count.value}</Button>
      Context Api :
      <Button onClick={() => context.setCount((prev: number) => prev + 1)}>
        {context.count}
      </Button>
      {/* <div className="card h-80 bg-[#444]"></div> */}
      <h1 className="text-red-500">ok</h1>
      <WiAlien />
      {/* <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      /> */}
    </main>
  );
}

import { useSession, signIn, signOut } from "next-auth/react";
import { convert } from "@/lib/utilities/converter";
function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

console.log(convert(10));
