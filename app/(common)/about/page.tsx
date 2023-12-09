"use client";

import { CounterContext } from "@/lib/context-api";
import { useAppSelector } from "@/lib/redux";
import { useContext } from "react";

// import dynamic from "next/dynamic";

// const DynamicUserComponent = dynamic(
//   () => import("../../components/User").then((file) => file),
//   {
//     loading: () => <p>Loading...</p>,
//   }
// );

// export default function About() {
//   return <DynamicUserComponent />;
// }

export default function About() {
  const count = useAppSelector((state) => state.counter.count);

  const context = useContext(CounterContext);
  return (
    <>
      Redux:{count.value} Context Api:{context.count}
    </>
  );
}
