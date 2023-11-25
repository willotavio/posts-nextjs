import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

export default async function deletePost(id: string){
  const document = doc(db, "posts", id);
  try{
    await deleteDoc(document);
  }
  catch(error){
    console.log(error);
  }
}