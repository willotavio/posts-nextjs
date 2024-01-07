"use client";

import { UseFormRegister } from "react-hook-form";

type TProps = {
  label: string;
  id: string;
  type: string
  reg?: { register: UseFormRegister<any> };
  errors?: Record<string, any>;
  step?: string;
  pattern?: string;
}

export default function InputField({ label, id, type, reg, errors, step, pattern }: TProps){
  return(
    <div className="flex flex-col gap-y-2 relative">
      <input className={ `input-default peer ${ errors && errors[id] && "input-error" }` } { ...reg?.register(id) } type={ type } id={ id } placeholder="" pattern={ pattern } step={ step } />
      <label className="label-default" htmlFor={ id }>{ label }</label>
      <p className="h-3 text-xs ml-2 my-2 mr-auto text-red-500">{ errors && errors[id]?.message }</p>
    </div>
  );
}