"use client"
import { useAppSelector } from "@/lib/redux";
import { useState } from "react";

export default function User() {
  // const [user, setUser] = useState({ name: "w@w.com" });
  const count = useAppSelector((state) => state.counter.count.value);

  return <div>{count}</div>;
}
  