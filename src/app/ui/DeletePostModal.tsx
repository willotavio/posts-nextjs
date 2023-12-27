'use client';

import { useState } from "react";
import deletePost from "../lib/post/deletePost";
import { removePost } from "../redux/features/posts-slice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

type Props = {
  id: string
}

export default function DeletePostModal({ id }: Props){
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return(
    <div>
      <button className="hover:opacity-80" onClick={openModal}>Delete</button>
      {
        isOpen
        &&
        <div className="bg-zinc-900 fixed inset-0 dark:bg-opacity-80 bg-opacity-80 flex items-center justify-center">
          <div className="dark:bg-zinc-900 bg-white w-60 z-50 h-36 shadow-lg shadow-gray-700 dark:shadow-black rounded-md flex flex-col items-center justify-center">
            <h1 className="text-base">Delete post?</h1>
            <div className="grid grid-cols-2 w-60 mt-8">
              <button className="w-20 p-2 m-auto bg-red-800 text-white text-base rounded-3xl hover:cursor-pointer hover:bg-red-700" onClick={ () => [deletePost(id), closeModal(), dispatch(removePost(id))] }>Delete</button>
              <button className="w-20 p-2 m-auto bg-gray-900 text-white text-base rounded-3xl hover:cursor-pointer hover:bg-gray-800" onClick={ closeModal }>Cancel</button>
            </div>
          </div>
        </div>
      }
    </div>
  );
}