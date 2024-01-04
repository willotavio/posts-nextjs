'use client';

import { useState } from "react";
import { User } from "../../../types";
import ChangeProfilePictureButton from "./ChangeProfilePictureButton";
import EditUserForm from "./EditUserForm";
import Modal from "./Modal";
import Image from "next/image";

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
          {
            user.image
            &&
            userSession.id === user.id
            ?
            <ChangeProfilePictureButton user={ user } />
            :
            <Image className="my-2 outline outline-2 outline-purple-700 rounded-full w-[6rem] h-[6rem] object-cover flex flex-shrink-0" src={ user.image || '' } alt="profile picture" width={100} height={100} priority={true} />
          }
          <p>@{ user.name }</p>
          {
            userSession.id === user.id
            &&
            <>
              <p className="sm:break-normal break-all">{ user.email }</p>
              <button className="btn-primary text-base my-2 m-auto" onClick={ () => setIsOpen(true) }>Edit</button>
              {
                isOpen
                &&
                <Modal title="Edit user" setIsOpen={ setIsOpen }>
                  <EditUserForm user={ user } />
                </Modal>
              }
            </>
          }
          
        </div>
      }
    </>
  );
}