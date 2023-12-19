"use client";
import { useAppDispatch, useAppSelector, incremented } from "@/lib/redux";
import { Button } from "@nextui-org/react";


function ReduxConsumer() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <>
      Redux :{" "}
      <Button onClick={() => dispatch(incremented())}> {count.value}</Button>
    </>
  );
}
