"use client";

import { ChangeEvent, useState } from "react";
import changeProfileCover from "../lib/user/changeProfileCover";
import { User } from "../../../types";
import Image from "next/image";
import camera from "public/camera.svg";

type TProps = {
  user: User;
}

export default function ChangeProfileCoverButton({ user }: TProps){
  const [message, setMessage] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>){
    async function changeCover(){
      const image = event.target.files;
      if(image){
        const result = await changeProfileCover(image[0], user);
        setMessage(result.message);
      }
    }
    changeCover();
  }
  return(
    <div className="">
      <div className="hover:opacity-80">
        <Image className="object-cover w-full h-full absolute rounded-lg hover:bg-opacity-80" src={ user.cover || "https://firebasestorage.googleapis.com/v0/b/fir-posts-759fa.appspot.com/o/profile-covers%2Fdefault.jpg?alt=media&token=2f001989-1020-4209-ac92-7632dd513a27" } alt="profile cover" sizes="100vw" width={0} height={0} priority={true} />
        <label className="absolute w-full h-full bottom-0 right-0 opacity-0 hover:opacity-100 hover:cursor-pointer" htmlFor="changeCoverInput" >
          <input className="w-full opacity-0 text-xs" type="file" id="changeCoverInput" accept=".jpeg, .jpg, .png" onChange={ handleChange } />
          <Image className="absolute bottom-0 right-0 w-6 h-6 mr-2 mb-2" src={ camera } alt="camera" width={30} height={30} />
        </label>
      </div>
          <p className="text-xs absolute right-0 -bottom-6">{ message }</p>
    </div>
  );
}