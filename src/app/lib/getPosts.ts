import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../../../types";

export default async function getPosts(){
  
  let posts: Post[];
  const postsRef = collection(db, "posts");
  const data = await getDocs(postsRef);  

  posts = data.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  return posts;

}