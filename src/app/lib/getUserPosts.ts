import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post, User } from "../../../types";

export default async function getUserPosts(user: User){
  
  let posts: Post[];
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userEmail", "==", user.email))
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  return posts;
}