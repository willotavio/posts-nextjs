'use client';

import { Post, User } from "../../../types";
import DeletePostModal from "./DeletePostModal";

type Props = {
  post: Post;
  user: User
}

export default function PostCard({ post, user }: Props){
  return(
    <div className="m-auto w-96 min-h-fit border-2 border-gray-200 p-2 rounded-md">
      <div className="grid grid-cols-4 mb-5 [*_&]:text-xs">
        <img className="rounded-full w-10" src={post.userPic} alt="user picture" />
        <p>{post.userName}</p>
        <p>{post.date.split(" ")[0]}</p>
        {
          user.email === post.userEmail
          &&
          <p>
            <DeletePostModal id={post.id as string} />
          </p>
        }
      </div>
      <p className="text-justify break-words">{post.content}</p>
    </div>
  );
}