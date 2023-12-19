"use client";
import { CounterContext } from "@/lib/context-api";
import { Button } from "@nextui-org/react";

import React, { useContext, useEffect, useState } from "react";

function ContextConsumer() {
  const context = useContext(CounterContext);

  return (
    <React.Fragment>
      Context Api :
      <Button onClick={() => context.setCount((prev: number) => prev + 1)}>
        {context.count}
      </Button>
    </React.Fragment>
  );
}
