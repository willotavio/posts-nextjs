import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options";
import UserCard from "./ui/UserCard";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className='text-center'>
      <h1>Home Page</h1>
      {
        session?.user
        &&
        <UserCard user={session.user} />
      }
    </div>
  )
}
