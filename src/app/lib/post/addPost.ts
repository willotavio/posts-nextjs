import { Post } from "../../../../types";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function addPost(post: Post){
  try{
    const doc = await addDoc(collection(db, "posts"), post);
    const id: string = doc.id;
    return id;
  }
  catch(error){
    console.log(error);
    return;
  }
}