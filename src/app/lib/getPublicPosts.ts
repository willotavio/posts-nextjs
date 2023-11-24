import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../../../types";

export default async function getPublicPosts(){
  
  let posts: Post[];
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("visibility", "==", "public"));
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  return posts;
}