import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../../../types";
import getUser from "./getUser";

export default async function getUserPosts(userId: string){
  
  let posts: Post[];

  const queryUser = await getUser(userId as string);

  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  posts.forEach((post) => {
    post.userName = queryUser.name;
    post.userEmail = queryUser.email;
    post.userPic = queryUser.image;
  });

  return posts;
}