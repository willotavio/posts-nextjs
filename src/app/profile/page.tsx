import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import { User } from "../../../types";
import getPosts from "../lib/getPosts";
import AddPostForm from "./addPostForm";

type Props = {
  user: User
}

export default async function Page({ user }: Props){
  const session = await getServerSession(options); 
  const posts = await getPosts();
  return (
    <div className="text-center">
      {
      session?.user
      &&
      <>
        <UserCard user={session.user} />

        <AddPostForm user={session.user}/>

        <h1>Posts</h1>
        {posts.filter((post) => (post.userEmail === session.user?.email))
        .map((post) => (
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