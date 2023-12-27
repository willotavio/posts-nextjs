'use client';

import { User } from "../../../types";
import ChangeProfilePictureButton from "./ChangeProfilePictureButton";

type Props = {
  user: User
}

export default function UserCard({ user }: Props){

  return (
    <div className="[&_*]:m-auto text-center w-96 xs:w-24 m-auto">
      <ChangeProfilePictureButton user={ user } />
      <p>{ user.name }</p>
      <p>{ user.email }</p>
    </div>
  );
}