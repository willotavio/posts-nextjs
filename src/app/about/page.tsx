import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
}

export default function Page(){
  return (
    <div className="text-center">
      <h1>About Page</h1>
    </div>
  );
}