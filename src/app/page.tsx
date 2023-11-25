import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import getPublicPosts from "./lib/getPublicPosts";
import PostCard from "./posts/PostCard";
import AddPostForm from "./posts/AddPostForm";
import { User } from "../../types";

export default async function Home() {
  const session = await getServerSession(options);
  const posts = await getPublicPosts();
  if(session && session.user){
    return (
      <div className='text-center'>
        {
          session?.user
          ?
          <>
            <AddPostForm user={ session.user }/>
            <h1>Posts</h1>
            {
              posts.map((post) => (
                <PostCard key={ post.id } post={ post } user={ session.user as User }/>
              ))
            }
          </>
          :
          <div className="bg-slate-800 w-32 m-auto mt-5 text-white p-3 hover:bg-slate-700 ...">
            <Link href='/api/auth/signin'>Login</Link>
          </div>
        }
      </div>
    )
  }
}