"use client"
import React, { Dispatch, SetStateAction, createContext, useState } from "react";
export const UIContext = createContext<{
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}>({
  isOpen: false,
  setOpen: () => {},
});

export function UIContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setOpen] = useState(true);

  return (
    <UIContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </UIContext.Provider>
  );
}
