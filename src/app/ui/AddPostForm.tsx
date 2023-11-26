'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post, User } from "../../../types";
import addPost from "../lib/addPost";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/auth-slice";
import { useAppSelector } from "../redux/store";

type Props = {
  user: User;
}

export default function AddPostForm({ user } : Props){

  const dispatch = useDispatch<AppDispatch>();

  let postsList: Post[] = useAppSelector((state) => state.postReducer.value.postsList);

  const schema = z.object({
    id: z.string().optional(),
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
    data.date = date.toISOString().slice(0, 19).replace("T", " ");
    const postId = await addPost(data as Post);
    data.id = postId;
    let updatedPostsList: Post[] = [...postsList, data as Post];
    dispatch(insertPost(updatedPostsList));
    reset();
  });

  return(
    <form className="w-96 [*_&]:w-96 xs:w-12 xs:[*_&]:w-12 flex flex-col mx-auto my-10" onSubmit={onSubmit}>
      <div className="flex mb-5">
        { user.image && <img className="rounded-full w-10 h-10 mr-2" src={ user.image } alt="profile picture" /> }
        <textarea className="border-b-2 border-gray-200 w-80 xs:w-12" {...register("content")} placeholder="Say something" />
      </div>
      <div className="flex">
        <select className="w-16 text-sm" {...register("visibility")}>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
        <input className="bg-gray-900 text-white text-sm w-20 ml-auto rounded-2xl hover:cursor-pointer hover:opacity-80" type="submit" value="Post" />
      </div>
      
    </form>
  );
}