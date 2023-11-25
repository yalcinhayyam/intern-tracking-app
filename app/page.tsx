"use client";
import {
  CounterContext,
  CounterContextProvider,
} from "@/state/context/counter";
import { useAppDispatch, useAppSelector, incremented } from "@/state/redux";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WiAlien } from "react-icons/wi";
import FileUploader from "@/components/FileUploader";
export default function Home() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();
  const context = useContext(CounterContext);
  console.log(location.origin)
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${location.origin}/word.docx`}
      style={{ width: "600px", height: "500px" }}
      frameBorder="0"
    ></iframe>
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
