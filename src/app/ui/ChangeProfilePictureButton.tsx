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
      <div className="relative hover:opacity-50 rounded-full my-2 justify-center">
          <Image className="outline outline-2 outline-purple-700 rounded-full w-[6rem] h-[6rem] object-cover flex flex-shrink-0" src={ user.image || '' } alt="profile picture" width={100} height={100} priority={true} />       
          <label className="w-full h-full absolute top-0 left-0 opacity-0 hover:opacity-100 hover:cursor-pointer" htmlFor="fileInput">
            <input className="opacity-0 w-full h-full" type="file" id="fileInput" accept=".jpeg, .jpg, .png" onChange={ handleChange }/>
            <Image className="w-full h-full p-[2rem] absolute top-0" src={ camera } alt="camera" width={30} height={30}></Image>
          </label>
      </div>
      <p className="text-xs h-2 my-1 text-center">{ message }</p>
    </div>
  );
}