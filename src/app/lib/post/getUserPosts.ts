import { collection, getDocs, where, query, startAfter, limit, doc, orderBy, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "../../../../types";
import getUser from "../user/getUser";

export default async function getUserPosts(userId: string, startAfterId?: string){

  let posts: Post[] = [];

  const queryUser = await getUser(userId as string);

  const postsRef = collection(db, "posts");
  let q;
  let documentSnapshots;
  if(!startAfterId){
    q = query(collection(db, "posts"), where("userId", "==", userId), orderBy("date", "desc"), limit(5));
    documentSnapshots = await getDocs(q);
  }
  else{
    const docSnap = await getDoc(doc(postsRef, startAfterId));
    q = query(collection(db, "posts"), where("userId", "==", userId), orderBy("date", "desc"), startAfter(docSnap), limit(5));
    documentSnapshots = await getDocs(q);
  }
  
  posts = documentSnapshots.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  posts.forEach((post) => {
    post.userName = queryUser?.name;
    post.userEmail = queryUser?.email;
    post.userPic = queryUser?.image;
  });

  return posts;
}