"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "./InputField";
import updateUser from "../lib/user/updateUser";
import { useState } from "react";
import { User } from "../../../types";
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
    name: z.string().min(4, "Name must contain between 4 and 32 characters").max(32, "Name must contain between 4 and 32 characters")
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.name
    }
  });

  const onSubmit = handleSubmit( async (data) => {
   const res = await updateUser(user.id as string, data);
   update(res.updatedInfo);
   setMessage(res.message);
   router.push(`/profile/${ data.name || user.name }`);
  });

  return(
    <form className="flex flex-col gap-y-5" onSubmit={ onSubmit }>
      <p className="h-5 text-xs pl-2 break-all">{ message }</p>
      <InputField label="Name" id="name" type="text" reg={ { register } } errors={ errors } />
      <input className="btn-primary m-auto" type="submit" value="Update" />
    </form>
  );
}