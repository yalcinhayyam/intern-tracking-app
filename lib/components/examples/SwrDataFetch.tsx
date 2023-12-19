"use client";
import { useAxiosQuery } from "@/lib/utilities/client";

function SwrDataFetch() {
    
  const { data, isLoading } = useAxiosQuery<{ a: number }>("/foo");
  if (typeof window !== "undefined") {
    if (!isLoading) {
      console.log("🚀 ~ file: page.tsx:17 ~ Home ~ data:", data?.a);
    }
  }

  return (
    <div>{data?.a}</div>
  )
}
