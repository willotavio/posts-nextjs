import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import { Post, User } from "../../../types";
import getUserPosts from "../lib/getUserPosts";
import AddPostForm from "../posts/addPostForm";
import PostCard from "../posts/postCard";

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
          <UserCard user={ session.user } />

          <AddPostForm user={ session.user }/>

          <h1>Posts</h1>
          {
            posts.map((post) => (
              <PostCard post={ post }/>
            ))
          }
        </>
        }
      </div>
    );
  }
}