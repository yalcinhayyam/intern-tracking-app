"use client";

import { CounterContext } from "@/context";
import { useAppSelector } from "@/redux";
import { useContext } from "react";

export default function About() {
  const count = useAppSelector((state) => state.counter.count);

  const context = useContext(CounterContext);
  return (
    <>
      Redux:{count.value} Context Api:{context.count}
    </>
  );
}
