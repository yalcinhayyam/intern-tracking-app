"use client"
import dynamic from "next/dynamic";

const LazyComponent = dynamic(() => import("./LazyComponent").then((file) => file), {
  loading: () => <p>Loading...</p>,
});

export function Component() {
  return <LazyComponent />;
}
