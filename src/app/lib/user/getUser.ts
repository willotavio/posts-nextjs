import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getUser(id: string){
  const docRef = doc(db, 'users', id);
  const user = await getDoc(docRef);
  return user;
}