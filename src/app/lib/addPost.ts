import { Post } from "../../../types";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function addPost(post: Post){
  try{
    await addDoc(collection(db, "posts"), post);
  }
  catch(error){
    console.log(error);
  }
}