import { db } from "@/app/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { User } from "../../../../types";

export default async function getUserByName(name: string){
  try{
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", "==", name));
    const userSnapshot = await getDocs(q);
    const user: User[] = userSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return { status: true, user: user[0] };
  }
  catch(error){
    console.log(error);
    return { status: false, message: error };
  }
}