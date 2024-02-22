"use client"
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { useAxiosQuery } from "@/utilities/client";

export default function Component() {
  const { data: session } = useSession()
  const {data,isLoading } = useAxiosQuery('/internship')
  if(!isLoading) {
    console.log(data)
  }

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}