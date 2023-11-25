"use client"
import { useAppSelector } from "@/lib/redux/store";
import { useState } from "react";

export default function User() {
  // const [user, setUser] = useState({ name: "w@w.com" });
  const count = useAppSelector((state) => state.counter.value);

  return <div>{count}</div>;
}
  