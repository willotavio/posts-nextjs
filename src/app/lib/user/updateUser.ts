import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { User } from "../../../../types";
import { db } from "@/app/config/firebase";

export default async function updateUser(id: string, user: User){
  try{
    const usersRef = collection(db, "users");
    if(user.name){
      const q = query(usersRef, where("name", "==", user.name));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        return { status: false, message: "This name is already in use" }
      }
    }
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, user);
    return { status: true, message: "User updated" };
  }
  catch(error){
    console.log(error);
    return { status: false, message: "An error occurred", error };
  }
}