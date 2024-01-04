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
    <div className="flex flex-col">
      <nav className="bg-neutral-200 dark:bg-neutral-800 border-b-2 border-b-purple-700 flex items-center p-2 z-10">
        <div className="flex gap-2 py-2">
          <Link className="link-default" href="/">Home</Link>
          <Link className="link-default hidden sm:flex" href="/about">About</Link>
        </div>
        <>
          {
            session.status == "unauthenticated"
            &&
            <div className="flex gap-2 ml-auto py-2">
              <Link className="link-default" href="/api/auth/signin">Signin</Link>
            </div>

          }
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
              <div className="ml-auto flex sm:hidden">
                <button onClick={ () => setIsOpen(!isOpen) } className="btn-primary">=</button>
              </div>
            </>
          }
        </>
      </nav>
      {
        isOpen
        &&
          <div className="flex sm:hidden gap-x-2 py-2 items-center justify-center bg-neutral-200 dark:bg-neutral-800 border-b-2 border-purple-700">
            <div className="flex flex-col items-start gap-y-1">
              <Link className="link-default" href="/profile">Profile</Link>
              <ToggleThemeButton />
              <Link className="link-default" href="/about">About</Link>
              <Link className="link-default" href="/api/auth/signout">Signout</Link>
            </div>
          </div>
        }
    </div>
  );
}