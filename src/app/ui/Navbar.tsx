import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Navbar(){
  const session = await getServerSession(options);

  return (
    <nav>
      <ul className="flex flex-row [&_*]:m-1">
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/about'>About</Link></li>
        {
          !session
          ?
          <li><Link href='/api/auth/signin'>Signin</Link></li>
          :
          <>
            <li><Link href='/profile'>Profile</Link></li>
            <li><Link href='/api/auth/signout'>Signout</Link></li>
          </>
        }
      </ul>
    </nav>
  );
}