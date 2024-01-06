'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, User } from "../../../types";
import addPost from "../lib/post/addPost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/posts-slice";
import { useAppSelector } from "../redux/store";
import Image from "next/image";
import { useState } from "react";

type Props = {
  user: User
}

export default function AddPostForm({ user }: Props){
  const dispatch = useDispatch<AppDispatch>();

  const [postLength, setPostLength] = useState(0);

  let postsList: Post[] = useAppSelector((state) => state.postReducer.value.postsList);

  const schema = z.object({
    content: z.string().min(1).max(255),
    visibility: z.string().min(1)
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit( async(data) => {
    data.userId = user.id
    const date = new Date();
    data.date = date.toISOString().slice(0, 19).replace("T", " ");
    const result = await addPost(data as Post);
    if(result.status){
      data.id = result.id;
      let updatedPostsList: Post[] = [ 
        {
          ...data as Post,
          userName: user.name as string,
          userEmail: user.email as string,
          userPic: user.image as string
        },
        ...postsList
      ];
      dispatch(insertPost(updatedPostsList));
      reset();
      setPostLength(0);
    }
  });

  if(user){
    return(
      <div className="flex flex-col items-center w-full">
        <form className="dark:bg-neutral-800 bg-neutral-200 flex flex-col my-10 gap-y-2 sm:w-[26rem] w-2/3 rounded-md" onSubmit={ onSubmit }>
          <div className="flex gap-x-2 w-full justify-center">
            <div className="flex mb-5 w-10 h-10 flex-shrink-0">
              { user.image && <Image className="outline outline-2 outline-purple-700 rounded-full w-full h-full" src={ user.image } alt="profile picture" width={100} height={100} priority={true} /> }
            </div>
            <textarea className="dark:bg-neutral-800 bg-neutral-200 rounded-lg p-2 focus:outline-slate-200 w-full" { ...register("content") } onChange={ (e) => (setPostLength(e.target.value.length)) } placeholder="Say something" maxLength={ 128 } />
          </div>
          
          <div className="flex gap-x-2 w-full items-center justify-center">
            <select className="dark:bg-neutral-800 bg-neutral-200 rounded-lg focus:outline-slate-200 text-purple-700" { ...register("visibility") }>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <p className="text-xs">{ postLength }/128</p>
            <input className="btn-primary" type="submit" value="Post" />
          </div>
        </form>
      </div>
    );    
  }
}