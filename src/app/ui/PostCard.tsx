'use client';

import { ChangeEvent } from "react";
import { Post, User } from "../../../types";
import updatePost from "../lib/post/updatePost";
import DeletePostModal from "./DeletePostModal";
import Image from "next/image";

type Props = {
  post: Post;
  user: User
}

export default function PostCard({ post, user }: Props){
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const updateVisibility = async () => {
      await updatePost(post.id as string, { visibility: event.target.value });
    }
    updateVisibility();
  }
  return(
    <div className="dark:bg-zinc-900 bg-gray-50 mx-auto my-1 p-3 w-96 rounded-md">
      <div className="grid grid-cols-3 mb-5 [*_&]:text-xs">
        <div className="flex col-span-2 gap-2 items-center">
          { post?.userPic && <Image className="rounded-full w-10 h-10" src={ post.userPic } alt="user picture" width={100} height={100} priority={true} /> }
          <p>{ post.userName }</p>
          <p>{ post.date.split(" ")[0] }</p>
        </div>
        
        {
          user.email === post.userEmail
          &&
          <div className="flex ml-auto col-span-1 gap-2 items-center">
            <select className="dark:bg-zinc-900 bg-gray-50 focus:outline-slate-200 appearance-none" id="selectInput" onChange={ handleSelect }>
              <option value={ post.visibility }>{ post.visibility.charAt(0).toUpperCase() + post.visibility.slice(1) }</option>
              {
                post.visibility === "public"
                ?
                <option value="private">Private</option>
                :
                <option value="public">Public</option>
              }
            </select>
            <DeletePostModal id={ post.id as string } />
          </div>
        }
      </div>
      <p className="text-justify break-words">{ post.content }</p>
    </div>
  );
}