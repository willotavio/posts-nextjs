"use client";

import Link from "next/link";
import Image from "next/image";
import ToggleThemeButton from "./ToggleThemeButton";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar(){
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full mb-16">
      <nav className="bg-neutral-200 dark:bg-neutral-800 flex flex-col fixed top-0 start-0 w-full z-10 items-center">
        <div className="flex items-center w-full p-2 border-b-2 border-b-purple-700">
          <div className="flex gap-2 py-2">
            <Link className="link-default" href="/">Home</Link>
            <Link className="link-default hidden sm:flex" href="/about">About</Link>
          </div>
          <>
            {
              session.status == "unauthenticated"
              &&
              <div className="gap-2 ml-auto py-2 hidden sm:flex">
                <ToggleThemeButton />
                <Link className="link-default" href="/api/auth/signin">Signin</Link>
              </div>
            }
            <div className="ml-auto flex sm:hidden">
              <button onClick={ () => setIsOpen(!isOpen) } className="btn-primary">=</button>
            </div>
            {
              session.status == "authenticated"
              &&
              <>
                <div className="ml-auto hidden flex-shrink-0 gap-2 sm:flex">
                  <Link href={ `/profile/${ session.data.user.name }` }>
                    <Image className="outline outline-2 outline-purple-700 mx-1 rounded-full w-10 h-10 hover:opacity-80" src={ session.data?.user?.image || '' } alt="profile picture" width={100} height={100} priority={true} />
                  </Link>
                  <div className="ml-auto flex gap-2 py-2">
                    <ToggleThemeButton />
                    <Link className="link-default" href="/api/auth/signout">Signout</Link>
                  </div>
                </div>
              </>
            }
          </>
        </div>
          {
          isOpen
          &&
          <div className="flex w-full sm:hidden gap-x-2 py-2 items-center justify-center border-b-2 border-purple-700">
            <div className="flex flex-col items-start gap-y-1">
              {
                session.status == "authenticated"
                &&
                <>
                  <Link className="link-default" href={ `/profile/${ session.data.user.name }` }>Profile</Link>  
                  <Link className="link-default" href="/api/auth/signout">Signout</Link>
                </>
              }
              <ToggleThemeButton />
              {
                session.status == "unauthenticated"
                &&
                <Link className="link-default" href="/api/auth/signin">Signin</Link>
              }
              <Link className="link-default" href="/about">About</Link>
            </div>
        </div>
          }
      </nav>
    </div>
  );
}