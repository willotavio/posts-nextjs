import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import { Post, User } from "../../../types";
import getUserPosts from "../lib/getUserPosts";
import AddPostForm from "./addPostForm";

type Props = {
  user: User
}

export default async function Page({ user }: Props){
  const session = await getServerSession(options); 
  if(session?.user){
    let posts: Post[] = await getUserPosts(session.user);
    return (
      <div className="text-center">
        {
        session?.user
        &&
        <>
          <UserCard user={session.user} />

          <AddPostForm user={session.user}/>

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
          ))}
        </>
        }
      </div>
    );
  }
}