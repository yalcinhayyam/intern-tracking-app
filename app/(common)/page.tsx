"use client"

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useAxiosQuery } from "@/utilities/client";
import { Button } from "@nextui-org/react";
import { UserIcon } from "./UserIcon";
import { CameraIcon } from "./CameraIcon";
import { useContext } from "react";
import { UIContext } from "@/context/ui";

export default function Component() {
  const { data: session } = useSession()
  const {data,isLoading } = useAxiosQuery('/internship')
  if(!isLoading) {
    console.log(data)
  }


  const context = useContext(UIContext);

  if (session) {
    return (
      <>
        <div className="flex gap-4 items-end justify-end">
          {/* <Button color="success" endContent={<CameraIcon />}>
            Take a photo
          </Button> */}
          <Button
            color="secondary"
            variant="bordered"
            startContent={<UserIcon />}
            onClick={() => context.setOpen(prev=> !prev)}
          >
            Open
            {/* Delete user */}
          </Button>
        </div>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
