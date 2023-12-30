import { Dispatch } from "react";

type TProps = {
  children: React.ReactNode;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  content?: string;
}

export default function Modal({ children, setIsOpen, title, content }: TProps){
  return(
    <div className="fixed flex inset-0 z-10 bg-black bg-opacity-80 items-center justify-center">
      <div className="flex flex-col text-base bg-neutral-200 dark:bg-neutral-800 rounded-lg">
        <div className="flex gap-2 p-2">
          <h1>{ title }</h1>
          <button className="text-xs hover:opacity-80 ml-auto" onClick={ () => setIsOpen(false) }>X</button>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <p className="text-sm">{ content }</p>
          { children }
        </div>
      </div>
    </div>
  );
}