import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import getPublicPosts from "./lib/post/getPublicPosts";
import AddPostForm from "./ui/AddPostForm";
import PublicPostsList from "./ui/PublicPostsList";

export default async function Home() {
  const session = await getServerSession(options);
  const posts = await getPublicPosts();
  return (
    <div className='text-center'>
      {
        session?.user
        ?
        <>
          <AddPostForm user = { session.user } />
          <div className="mt-10">
            <PublicPostsList user={ session.user } />
          </div>
        </>
        :
        <div className="bg-slate-800 w-32 m-auto mt-5 text-white p-3 hover:bg-slate-700 ...">
          <Link href='/api/auth/signin'>Login</Link>
        </div>
      }
    </div>
  )
}