'use client';

import { useState } from "react";
import deletePost from "../lib/post/deletePost";
import { removePost } from "../redux/features/posts-slice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import Modal from "./Modal";

type Props = {
  id: string
}

export default function DeletePostModal({ id }: Props){
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  return(
    <div>
      <button className="hover:opacity-80 text-purple-700" onClick={ () => setIsOpen(true) }>Delete</button>
      {
        isOpen
        &&
        <Modal setIsOpen={setIsOpen} title="Delete post?" content="Are you sure you want to delete this post?">
            <div className="flex flex-col gap-2 p-2">
              <button className="btn-red m-auto" onClick={ () => [deletePost(id), setIsOpen(false), dispatch(removePost(id))] }>Delete</button>
            </div>
        </Modal>
      }
    </div>
  );
}