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
        <div className="text-center w-96 xs:w-24 m-auto">
          <ChangeProfilePictureButton user={ user } />
          <p>{ user.name }</p>
          <p>{ user.email }</p>
          <button className="btn-primary my-2" onClick={ () => setIsOpen(true) }>Edit</button>
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