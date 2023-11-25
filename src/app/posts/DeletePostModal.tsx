'use client';

import { useState } from "react";
import deletePost from "../lib/deletePost";

type Props = {
  id: string
}

export default function DeletePostModal({ id }: Props){
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  return(
    <>
      <button onClick={openModal}>Delete</button>
      {
        isOpen
        &&
        <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center">
          <div className="bg-white w-60 h-36 rounded-xl flex flex-col items-center justify-center">
            <h1 className="text-base">Delete post?</h1>
            <div className="grid grid-cols-2 w-60">
              <button className="w-20 m-auto bg-red-800 text-white text-base rounded-2xl hover:cursor-pointer hover:bg-opacity-80" onClick={ () => [deletePost(id), closeModal()] }>Delete</button>
              <button className="w-20 m-auto bg-gray-900 text-white text-base rounded-2xl hover:cursor-pointer hover:bg-opacity-80" onClick={closeModal}>Cancel</button>
            </div>
          </div>
          
        </div>
      }
    </>
  );
}