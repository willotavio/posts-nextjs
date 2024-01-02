import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import UserCard from "../ui/UserCard";
import AddPostForm from "../ui/AddPostForm";
import UserPostsList from "../ui/UserPostsList";
import { redirect } from "next/navigation";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile"
}

export default async function Page(){
  const session = await getServerSession(options); 
  if(session?.user){
    return (
      <div>
        {
        session?.user
        &&
        <>
          <UserCard user={ session.user } />

          <AddPostForm user = { session.user }/>

          <UserPostsList user={ session.user } />
        </>
        }
      </div>
    );
  }
  else{
    redirect('/api/auth/signin');
  }
}