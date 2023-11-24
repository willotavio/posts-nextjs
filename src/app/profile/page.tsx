import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import { User } from "../../../types";
import getPosts from "../lib/getPosts";

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
        <h1>Posts</h1>
        {posts.map((post) => (
          <p key={post.id}>{post.content}</p>
        ))}
      </>
      }
    </div>
  );
}