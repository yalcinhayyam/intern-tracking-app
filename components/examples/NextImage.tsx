import Image from "next/image";
import React from "react";
import { WiAlien } from "react-icons/wi";

function NextImage() {
  return (
    <React.Fragment>
      <WiAlien />
      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
    </React.Fragment>
  );
}
