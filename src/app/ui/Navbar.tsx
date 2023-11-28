import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";
import Image from "next/image";

export default async function Navbar(){
  const session = await getServerSession(options);

  return (
    <nav className="flex fixed top-0 w-full bg-gray-900 text-white p-2 z-50">
      <div className="[&_.link]:mx-1 py-2 ...">
        <Link className="link hover:opacity-80" href='/'>Home</Link>
        <Link className="link hover:opacity-80" href='/about'>About</Link>
      </div>
      
      {
        !session
        ?
        <div className="[&_.link]:mx-1 ml-auto py-2 ...">
          <Link className="link hover:opacity-80" href='/api/auth/signin'>Signin</Link>  
        </div>
        :
        <div className="mx-1 ml-auto flex [&_.link]:py-2">
          <Link href='/profile'>
            <Image className="mx-1 rounded-full w-10 hover:opacity-80" src={session.user?.image || ''} alt="profile picture" width={100} height={100}/>
          </Link>
          <Link className="link hover:opacity-80" href='/api/auth/signout'>Signout</Link>
        </div>
      }
    </nav>
  );
}