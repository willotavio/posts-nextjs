import { Post } from "../../../../types";
import { db } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function addPost(post: Post){
  try{
    if(post.content.length > 128){
      return { status: false, message: "Post too long" };
    }
    const doc = await addDoc(collection(db, "posts"), post);
    const id: string = doc.id;
    return { status: true, id };
  }
  catch(error){
    console.log(error);
    return { status: false, message: error };
  }
}