'use client';

import { ChangeEvent } from "react";
import { Post, User } from "../../../types";
import updatePost from "../lib/post/updatePost";
import DeletePost from "./DeletePost";
import Image from "next/image";
import Link from "next/link";

type Props = {
  post: Post;
  user: User;
  userSession: User;
}

export default function PostCard({ post, user, userSession }: Props){
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const updateVisibility = async () => {
      await updatePost(post.id as string, { visibility: event.target.value });
    }
    updateVisibility();
  }
  return(
    <div className="flex flex-col justify-center dark:bg-neutral-800 bg-neutral-200 my-2 sm:w-[26rem] w-2/3 border-b-2 border-b-purple-700">
      <div className="grid sm:grid-cols-3 text-xs">
        <div className="flex col-span-2 gap-2 items-center p-1">
          { 
            post?.userPic
            && 
            <Link className="flex flex-shrink-0" href={ `/profile/${ post.userName }` }>
              <Image className="outline outline-2 outline-purple-700 rounded-full w-10 h-10 " src={ post.userPic } alt="user picture" width={100} height={100} priority={true} /> 
            </Link>
          }
          <p className="break-all">@{ post.userName } - { post.date.split(" ")[0] }</p>
        </div>
        
        {
          userSession.id === post.userId
          &&
          <div className="flex sm:ml-auto col-span-1 gap-x-1 items-center">
            <select className="dark:bg-neutral-800 bg-neutral-200 text-purple-700 appearance-none p-2" id="selectInput" onChange={ handleSelect }>
              <option value={ post.visibility }>{ post.visibility.charAt(0).toUpperCase() + post.visibility.slice(1) }</option>
              {
                post.visibility === "public"
                ?
                <option value="private">Private</option>
                :
                <option value="public">Public</option>
              }
            </select>
            <DeletePost id={ post.id as string } />
          </div>
        }
      </div>
      <p className="text-justify p-2 break-words">{ post.content }</p>
    </div>
  );
}