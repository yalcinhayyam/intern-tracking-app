"use client"
import React, { createContext, useState } from "react";
export const CounterContext = createContext<{
  count: number;
  setCount: Function;
}>({
  count: 0,
  setCount: () => {},
});

export function CounterContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
}
