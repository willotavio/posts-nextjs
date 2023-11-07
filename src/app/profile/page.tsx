import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";

type Props = {
  user: User
}

export default async function Page({ user }: Props){
  const session = await getServerSession(options); 
  return (
    <div>
      {session?.user
        &&
        <UserCard user={session.user} />}
    </div>
  );
}