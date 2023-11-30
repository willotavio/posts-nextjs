'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import changeProfilePicture from "../lib/user/changeProfilePicture";
import { User } from "../../../types";
import { useState } from "react";

type Props = {
  user: User
}

export default function PostImageForm({ user }: Props){
  const [message, setMessage] = useState("");

  const schema = z.object({
    image: z.any()
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema)
  });
  
  const onSubmit = handleSubmit( async (data) => {
    const updated = await changeProfilePicture(data.image[0], user);
    updated ? setMessage("Updated") : setMessage("Invalid image");
    reset();
  });

  return(
    <div className="[*_&]:m-auto m-auto text-xs w-96">
      <form className="w-44 m-auto my-5" onSubmit={onSubmit} >
        <input type="file" {...register("image")} accept=".jpg, .jpeg, .png" />
        <div className="grid grid-cols-2">
          <input className="my-2 bg-gray-900 text-white p-1 w-20 ml-auto rounded-2xl hover:cursor-pointer hover:bg-gray-800" type="submit" value="Submit" />
          <p className="text-red-500 text-xs mt-3">{message}</p>
        </div>
      </form>
    </div>
  );
}