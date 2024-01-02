import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import Link from "next/link";
import AddPostForm from "./ui/AddPostForm";
import PublicPostsList from "./ui/PublicPostsList";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div className='text-center'>
      {
        session?.user
        &&
        <>
          <AddPostForm user = { session.user } />
          <PublicPostsList user={ session.user } />
        </>
      }
    </div>
  )
}