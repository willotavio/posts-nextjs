import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";
import ToggleThemeButton from "./ToggleThemeButton";

export default async function Navbar(){
  const session = await getServerSession(options);

  return (
    <nav className="bg-neutral-200 dark:bg-neutral-800 border-b-2 border-b-purple-700 flex fixed top-0 w-full p-2 z-10">
      <div className="flex gap-2 py-2">
        <Link className="hover:opacity-80 border-b-2 border-transparent hover:border-purple-700" href="/">Home</Link>
        <Link className="hover:opacity-80 border-b-2 border-transparent hover:border-purple-700" href="/about">About</Link>
      </div>
      <>
        {
          !session
          ?
          <div className="flex gap-2 ml-auto py-2">
            <Link className="hover:opacity-80 border-b-2 border-transparent hover:border-purple-700" href="/api/auth/signin">Signin</Link>
          </div>
          :
          <div className="ml-auto flex gap-2">
          <Link href="/profile">
            <Image className="mx-1 rounded-full w-10 h-10 hover:opacity-80" src={ session.user?.image || '' } alt="profile picture" width={100} height={100} priority={true} />
          </Link>
            <div className="ml-auto flex gap-2 py-2">
              <ToggleThemeButton />
              <Link className="hover:opacity-80 border-b-2 border-transparent hover:border-purple-700" href="/api/auth/signout">Signout</Link>
            </div>
            
          </div>
        }
      </>
    </nav>
  );
}