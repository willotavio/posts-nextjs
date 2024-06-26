import { Dispatch, useEffect } from "react";

type TProps = {
  children: React.ReactNode;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content?: string;
}

export default function Modal({ children,  setIsOpen, title, content }: TProps){
  return(
    <div className="fixed flex inset-0 z-10 bg-black bg-opacity-80 items-center justify-center" onClick={ () => setIsOpen(false) }>
      <div className="flex flex-col text-base bg-neutral-200 dark:bg-neutral-800 rounded-lg p-2 sm:w-[26rem] w-2/3" onClick={ (e) => e.stopPropagation() }>
        <div className="flex gap-2 p-2">
          <h1>{ title }</h1>
          <button className="text-xs hover:opacity-80 ml-auto font-bold" onClick={ () => setIsOpen(false) }>X</button>
        </div>
        <div className="flex flex-col gap-x-5 px-2">
          <p className="text-sm break-all">{ content }</p>
          { children }
        </div>
      </div>
    </div>
  );
}