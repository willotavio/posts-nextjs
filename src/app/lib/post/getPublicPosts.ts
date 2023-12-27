import { collection, query, where, getDocs, orderBy, limit, getDoc, doc, startAfter } from "firebase/firestore";
import { db } from "../../config/firebase";
import { FirestoreUser, Post } from "../../../../types";
import getUser from "../user/getUser";

export default async function getPublicPosts(startAfterId?: string){
  
  let posts;
  const postsRef = collection(db, "posts");
  let q;
  let documentSnapshots;

  if(!startAfterId){
    q = query(postsRef, where("visibility", "==", "public"), orderBy("date", "desc"), limit(5));
    documentSnapshots = await getDocs(q);
  }
  else{
    const docSnap = await getDoc(doc(postsRef, startAfterId));
    q = query(postsRef, where("visibility", "==", "public"), orderBy("date", "desc"), startAfter(docSnap), limit(5));
    documentSnapshots = await getDocs(q);
  }

  posts = documentSnapshots.docs.map((doc) => (
    ({...doc.data(), id: doc.id})
  )) as Post[];
  const userIds = Array.from(new Set(posts.map(post => post.userId)));
  const usersPromises = userIds.map( async (id) => {
    return {...await getUser(id as string), id};
  });
  
  const users = await Promise.all(usersPromises);
  
  posts.forEach( async(post) => {
    let postUser: FirestoreUser = users.find((user) => user.id == post.userId) as FirestoreUser;
    post.userName = postUser?.name;
    post.userEmail = postUser?.email;
    post.userPic = postUser?.image;
  });

  return posts;
}