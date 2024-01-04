import { options } from "@/app/api/auth/[...nextauth]/options";
import getUserByName from "@/app/lib/user/getUserByName";
import AddPostForm from "@/app/ui/AddPostForm";
import UserCard from "@/app/ui/UserCard";
import UserPostsList from "@/app/ui/UserPostsList";
import { getServerSession } from "next-auth";

export default async function Page({ params }: { params: { name: string } }){

  const session = await getServerSession(options);
  const user = await getUserByName(params.name);

  if(!user.user?.id || !session?.user.id){
    return(
      <></>
    );
  }

  return(
    <div>
      <UserCard user={ user.user } userSession={ session.user } />
      {
        session?.user.id === user.user.id
        &&
        <AddPostForm user={ user.user } />
      }
      <UserPostsList user={ user.user } />
    </div>
  );
}