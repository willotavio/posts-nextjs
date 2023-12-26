'use client';

import changeProfilePicture from "../lib/user/changeProfilePicture";
import { User } from "../../../types";
import { ChangeEvent, useState } from "react";
import Image from "next/image";
import camera from "public/camera.svg";

type Props = {
  user: User
}

export default function ChangeProfilePictureButton({ user }: Props){
  const [message, setMessage] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    const changeProfile = async () => {
      const image = event.target.files;
      if(image){
        const res = await changeProfilePicture(image[0], user);
        setMessage(res ? "Updated" : "Failed");
      }
    }
    changeProfile();
  }

  return(
    <div>
      <div className="relative w-fit h-fit m-auto hover:opacity-50 rounded-full">
        <Image className="rounded-full w-32 h-32 object-cover" src={user.image || ''} alt="profile picture" width={100} height={100} priority={true} />
        <label htmlFor="fileInput">
          <input className="opacity-0 absolute top-0 left-0 w-full h-full" type="file" id="fileInput" accept=".jpeg, .jpg, .png" onChange={ handleChange }/>
          <Image className="absolute w-full h-full p-12 top-0 opacity-0 hover:opacity-100 hover:cursor-pointer" src={ camera } alt="camera" width={30} height={30}></Image>
        </label>
      </div>
      <p className="h-5">{ message }</p>
    </div>
  );
}