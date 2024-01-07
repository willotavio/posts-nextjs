"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import updateUser from "../lib/user/updateUser";
import { useState } from "react";
import { TUpdateUser, User } from "../../../types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type TProps = {
  user: User
}

export default function EditUserForm({ user }: TProps){
  const router = useRouter();
  
  const { update } = useSession();
  const [message, setMessage] = useState("");

  const schema = z.object({
    name: z.string().min(4, "Name must contain between 4 and 16 characters").max(16, "Name must contain between 4 and 16 characters")
      .refine((value) => /^[a-zA-Z0-9_.]{5,15}$/.test(value), "Name must contain only letters, numbers, \"_\" and \".\""),
    description: z.string().max(16, "Description must contain less than 16 characters")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name,
      description: user.description
    }
  });

  const onSubmit = handleSubmit( async (data) => {
    let formData: User = {};

    if(data.name !== user.name){
      formData.name = data.name;
    }
    if(data.description !== user.description){
      formData.description = data.description;
    }

    if(Object.keys(formData).length > 0){
      let res = await updateUser(user.id as string, user, formData as TUpdateUser);
      setMessage(res.message);

      if(res.status){
        update(res.updatedInfo);
        if(!res.updatedInfo?.name){
          router.push(`/profile/${ user.name }`);
          router.refresh();
        }
        else{
          router.push(`/profile/${ res.updatedInfo?.name }`);
          router.refresh();
        }  
      }
    }
  });

  return(
    <form className="flex flex-col gap-y-5" onSubmit={ onSubmit }>
      <p className="h-5 text-xs pl-2 break-all">{ message }</p>
      <InputField label="Name" id="name" type="text" reg={ { register } } errors={ errors } />
      <InputField label="Description" id="description" type="text" reg={ { register } } errors={ errors } />
      <input className="btn-primary m-auto" type="submit" value="Update" />
    </form>
  );
}