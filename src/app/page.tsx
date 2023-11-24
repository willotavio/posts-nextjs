import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div className='text-center [&_*]:my-5'>
      <h1>Home Page</h1>
      {
        session?.user
        ?
        <>
          <h1>
            {session.user.name}
          </h1>
        </>
        :
        <>
          <Link className="bg-slate-800 text-white p-3 hover:bg-slate-700 ..." href='/api/auth/signin'>Login</Link>
        </>
      }
    </div>
  )
}
