"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
  const session = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if(session.status === "unauthenticated"){
      router.push("/auth/signin");
    }
  }, [session.status]);

  if(session.status === "authenticated"){
    return(
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-12 p-12 rounded-lg sm:w-[26rem] w-2/3 text-center bg-neutral-300 dark:bg-neutral-900">
          <h1 className="sm:text-xl text-base">Are you sure you want to signout?</h1>
          <button className="btn-primary m-0 p-2 w-full truncate" onClick={ () => signOut({ callbackUrl: "/" }) }>Signout</button>
        </div>
      </div>
    );
  }
  
}