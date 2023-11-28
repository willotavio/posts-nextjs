import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import { Post } from "../../../types";
import getUserPosts from "../lib/getUserPosts";
import AddPostForm from "../ui/AddPostForm";
import PostsList from "../ui/PostsList";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile"
}

export default async function Page(){
  const session = await getServerSession(options); 
  if(session?.user){
    let posts: Post[] = await getUserPosts(session.user.id as string);
    
    return (
      <div className="text-center">
        {
        session?.user
        &&
        <>
          <UserCard user={ session.user } />

          <AddPostForm user = { session.user }/>
          <hr />
          <div className="mt-10">
            <PostsList user={ session.user } posts={ posts }/>
          </div>
        </>
        }
      </div>
    );
  }
  else{
    redirect('/api/auth/signin');
  }
}