'use client';

import { useState } from "react";
import { User } from "../../../types";
import EditUserForm from "./EditUserForm";
import Modal from "./Modal";
import ChangeProfilePictureButton from "./ChangeProfilePictureButton";
import Image from "next/image";
import ChangeProfileCoverButton from "./ChangeProfileCoverButton";

type Props = {
  user: User;
  userSession: User;
}

export default function UserCard({ user, userSession }: Props){

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {
        user.id
        &&  
        <div className="flex flex-col items-center m-auto">
          <div className="flex flex-col relative sm:w-[32rem] w-3/4 sm:h-[12rem] h-[6rem] transition-all ease-in-out mb-16 rounded-lg">
            {
              userSession.id === user.id
              ?
              <ChangeProfileCoverButton user={ user } />
              :
              <div className="">
                <Image className="object-cover absolute w-full h-full rounded-lg" src={ user.cover || "https://firebasestorage.googleapis.com/v0/b/fir-posts-759fa.appspot.com/o/profile-covers%2Fdefault.jpg?alt=media&token=2f001989-1020-4209-ac92-7632dd513a27" } alt="profile cover" sizes="100vw" width={0} height={0} priority={true} ></Image>
              </div>
            }
            <div className="flex m-auto relative inset-0 sm:top-[5.6rem] top-[3rem]">
              {
                user.image
                &&
                userSession.id === user.id
                ?
                <ChangeProfilePictureButton user={ user } />
                :
                <Image className="my-2 outline outline-4 outline-neutral-200 dark:outline-neutral-800 rounded-full sm:w-[6rem] sm:h-[6rem] w-[5rem] h-[5rem] object-cover flex flex-shrink-0" src={ user.image || '' } alt="profile picture" width={100} height={100} priority={true} />
              }
            </div>
          </div>
          
          <p>@{ user.name }</p>
          <p>{ user.description }</p>
          {
            userSession.id === user.id
            &&
            <div className="sm:w-[26rem] w-2/3 border-b-2 border-purple-700 text-center">
              <p className="sm:break-normal break-all">{ user.email }</p>
              <button className="btn-primary text-base my-2 m-auto" onClick={ () => setIsOpen(true) }>Edit</button>
              {
                isOpen
                &&
                <Modal title="Edit user" setIsOpen={ setIsOpen }>
                  <EditUserForm user={ user } />
                </Modal>
              }
            </div>
          }
        </div>
      }
    </>
  );
}