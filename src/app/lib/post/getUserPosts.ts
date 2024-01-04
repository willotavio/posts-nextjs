import { collection, getDocs, where, query, startAfter, limit, doc, orderBy, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Post } from "../../../../types";
import getUser from "../user/getUser";

export default async function getUserPosts(id: string, visibility?: string, startAfterId?: string){
  let posts: Post[] = [];

  const queryUser = await getUser(id as string);
  if(!queryUser){
    return [];
  }
  const postsRef = collection(db, "posts");
  let q;
  let documentSnapshots;
  if(!startAfterId){
    if(visibility == "public"){
      q = query(collection(db, "posts"), where("userId", "==", id), where("visibility", "==", "public"), orderBy("date", "desc"), limit(5));
    }
    else{
      q = query(collection(db, "posts"), where("userId", "==", id), orderBy("date", "desc"), limit(5));
    }
    documentSnapshots = await getDocs(q);
  }
  else{
    const docSnap = await getDoc(doc(postsRef, startAfterId));
    if(visibility == "public"){
      q = query(collection(db, "posts"), where("userId", "==", id), where("visibility", "==", "public"), orderBy("date", "desc"), startAfter(docSnap), limit(5));
    }
    else{
      q = query(collection(db, "posts"), where("userId", "==", id), orderBy("date", "desc"), startAfter(docSnap), limit(5));
    }
    documentSnapshots = await getDocs(q);
  }
  
  posts = documentSnapshots.docs.map((doc) => (
      ({...doc.data(), id: doc.id})
    )) as Post[];

  posts.forEach((post) => {
    post.userName = queryUser?.name || "";
    post.userEmail = queryUser?.email || "";
    post.userPic = queryUser?.image || "";
  });

  return posts;
}