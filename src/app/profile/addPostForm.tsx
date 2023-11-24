'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, User } from "../../../types";
import addPost from "../lib/addPost";

type Props = {
  user: User;
}

export default function AddPostForm({ user } : Props){

  const schema = z.object({
    content: z.string().min(1).max(255),
    userEmail: z.string().optional(),
    userName: z.string().optional(),
    userPic: z.string().optional(),
    visibility: z.string().min(1),
    date: z.string().optional()
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = handleSubmit( async(data) => {
    data.userEmail = user.email;
    data.userName = user.name;
    data.userPic = user.image;
    const date = new Date();
    data.date = date;
    addPost(data as Post);
    reset();
  });

  return(
    <form className="[*_&]:w-60 flex flex-col mx-auto my-10" onSubmit={onSubmit}>
      <h1>Add Post</h1>
      <textarea className="border-b-2 border-black" {...register("content")} placeholder="Content" />
      <select {...register("visibility")}>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <input className="bg-black text-white hover:cursor-pointer" type="submit" value="Post" />
    </form>
  );

}