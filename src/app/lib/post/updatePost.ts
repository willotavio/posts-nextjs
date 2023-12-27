import { db } from "@/app/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { TUpdatePost } from "../../../../types";

export default async function updatePost(id: string, post: TUpdatePost){
  const docRef = doc(db, "posts", id);
  try{
    await updateDoc(docRef, post);
  }
  catch(error){
    console.log(error);
  }
}