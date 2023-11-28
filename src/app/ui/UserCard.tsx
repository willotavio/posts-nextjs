'use client';

import { User } from "../../../types";
import { useAppSelector } from "../redux/store";
import Image from "next/image";

type Props = {
  user: User
}

export default function UserCard({ user }: Props){
  const posts = useAppSelector((state) => state.postReducer.value.postsList);
  return (
    <div className="[&_*]:m-auto text-center w-96 xs:w-24 m-auto">
      <Image className="rounded-full" src={user.image || ''} alt="profile picture" width={100} height={100}/>
      <p>{ user.name }</p>
      <p>{ user.email }</p>
      {
        posts.length > 0
        ?
        <p>{posts.length} posts</p>
        :
        <p>No posts</p>
      }
    </div>
  );
}