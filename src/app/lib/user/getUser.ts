import { User } from "../../../../types";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getUser(id: string){
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  const user: User = { ...docSnap.data(), id: docSnap.id }
  return user;
}