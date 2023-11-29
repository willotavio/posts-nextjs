'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, User } from "../../../types";
import addPost from "../lib/addPost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/posts-slice";
import { useAppSelector } from "../redux/store";
import Image from "next/image";

type Props = {
  user: User
}

export default function AddPostForm({ user }: Props){
  const dispatch = useDispatch<AppDispatch>();

  let postsList: Post[] = useAppSelector((state) => state.postReducer.value.postsList);

  const schema = z.object({
    id: z.string().optional(),
    content: z.string().min(1).max(255),
    userId: z.string().optional(),
    visibility: z.string().min(1),
    date: z.string().optional()
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit( async(data) => {
    data.userId = user.id
    const date = new Date();
    data.date = date.toISOString().slice(0, 19).replace("T", " ");
    const postId = await addPost(data as Post);
    data.id = postId;
    let updatedPostsList: Post[] = [...postsList, 
      {
        ...data as Post, 
        userName: user.name as string,
        userEmail: user.email as string,
        userPic: user.image as string
      }];
    dispatch(insertPost(updatedPostsList));
    reset();
  });

  if(user){
    return(
      <form className="w-96 flex flex-col mx-auto my-10 bg-white shadow-md shadow-gray-300 rounded-md p-3" onSubmit={onSubmit}>
        <div className="flex mb-5">
          { user.image && <Image className="rounded-full w-10 h-10 mr-2" src={ user.image } alt="profile picture" width={100} height={100} priority={true} /> }
          <textarea className="border-b-2 border-gray-200 w-80" {...register("content")} placeholder="Say something" />
        </div>
        <div className="flex">
          <select className="w-20" {...register("visibility")}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <input className="bg-gray-900 text-white p-1 w-20 ml-auto rounded-2xl hover:cursor-pointer hover:bg-gray-800" type="submit" value="Post" />
        </div>
        
      </form>
    );    
  }
}