'use client';

import { useState } from "react";
import { User } from "../../../types";
import ChangeProfilePictureButton from "./ChangeProfilePictureButton";
import EditUserForm from "./EditUserForm";
import Modal from "./Modal";

type Props = {
  user: User
}

export default function UserCard({ user }: Props){

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {
        user.id
        &&
        <div className="flex flex-col items-center m-auto">
          <ChangeProfilePictureButton user={ user } />
          <p>@{ user.name }</p>
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
    </>
  );
}