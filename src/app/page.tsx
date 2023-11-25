import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import getPublicPosts from "./lib/getPublicPosts";
import PostCard from "./posts/postCard";

export default async function Home() {
  const session = await getServerSession(options);
  const posts = await getPublicPosts();
  return (
    <div className='text-center'>
      {
        session?.user
        ?
        <>
          <h1>Posts</h1>
          {
            posts.map((post) => (
              <PostCard post={ post }/>
            ))
          }
        </>
        :
        <>
          <Link className="bg-slate-800 text-white p-3 hover:bg-slate-700 ..." href='/api/auth/signin'>Login</Link>
        </>
      }
    </div>
  )
}
