import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Post } from "../../../types";
import getUser from "./getUser";

export default async function getPublicPosts(){
  
  let posts: Post[];
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("visibility", "==", "public"));
  const querySnapshot = await getDocs(q);
  posts = querySnapshot.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];
  
  const userIds = Array.from(new Set(posts.map(post => post.userId)));
  const usersPromises = userIds.map( async (id) => {
    return {...await getUser(id as string), id};
  });
  const users = await Promise.all(usersPromises);
  
  posts.forEach( async(post) => {
    let postUser = users.find((user) => user.id == post.userId)
    post.userName = postUser?.name;
    post.userEmail = postUser?.email;
    post.userPic = postUser?.image;
  });

  return posts;
}