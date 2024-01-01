'use client';

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ToggleThemeButton(){
  const { resolvedTheme, setTheme } = useTheme();
  
  const [ mounted, setMounted ] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, []);

  if(!mounted){
    return(
      <div className="w-10"></div>
    );
  }
  return(
    <div className="flex w-10 justify-center">
      <Link className="link-default" href="#" onClick={ () => setTheme(resolvedTheme === "dark" ? "light" : "dark") }>
        { resolvedTheme ? resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1) : " " }
      </Link>
    </div>
  );
}