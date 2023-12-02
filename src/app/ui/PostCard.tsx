'use client';

import { Post, User } from "../../../types";
import DeletePostModal from "./DeletePostModal";
import Image from "next/image";

type Props = {
  post: Post;
  user: User
}

export default function PostCard({ post, user }: Props){
  return(
    <div className="dark:bg-zinc-900 bg-gray-50 mx-auto my-1 p-3 w-96 rounded-md">
      <div className="grid grid-cols-3 mb-5 [*_&]:text-xs">
        <div className="[*_&]:text-justify flex col-span-2">
          {post?.userPic && <Image className="rounded-full w-10 h-10" src={post.userPic} alt="user picture" width={100} height={100} priority={true} /> }
          <p className="mx-2 mt-3">{post.userName}</p>
          <p className="mt-3">{post.date.split(" ")[0]}</p>
        </div>
        
        {
          user.email === post.userEmail
          &&
          <div className="ml-auto mt-3 col-span-1">
            <DeletePostModal id={post.id as string} />
          </div>
        }
      </div>
      <p className="text-justify break-words">{post.content}</p>
    </div>
  );
}