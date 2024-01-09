"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(){
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session.status === "authenticated"){
      router.push("/");
    }
  }, [session.status]);

  if(session.status === "unauthenticated"){
    return(
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-12 p-12 rounded-lg sm:w-[26rem] w-2/3 text-center bg-neutral-300 dark:bg-neutral-900">
          <h1 className="sm:text-xl text-base">Signin with your google account</h1>
          <button className="btn-primary m-0 p-2 w-full truncate" onClick={ () => signIn("google", { callbackUrl: "/" }) }>Signin with google</button>
        </div>
      </div>
    );
  }
}