import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import getPublicPosts from "./lib/getPublicPosts";

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
              <div key={post.id} className="m-auto w-36 mb-5">
              <div className="flex">
                <img className="rounded-full w-10" src={post.userPic} alt="user picture" />
                <h1>{post.userName}</h1>
              </div>
              <p className="text-xs">{post.date.split(" ")[0]}</p>
              <p>{post.content}</p>
            </div>
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
