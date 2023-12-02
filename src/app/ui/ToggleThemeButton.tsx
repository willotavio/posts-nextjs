'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ToggleThemeButton(){
  const { resolvedTheme, setTheme } = useTheme();
  
  const [ mounted, setMounted ] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted){
    return null;
  }
  return(
    <button className="w-10" onClick={ () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark') }>
      <span className="hover:opacity-80">{resolvedTheme ? resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1) : " "}</span>
    </button>
  );
}