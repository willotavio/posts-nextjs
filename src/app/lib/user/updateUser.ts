import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { TUpdateUser, User } from "../../../../types";
import { db } from "@/app/config/firebase";

export default async function updateUser(id: string, user: User, updatedUser: TUpdateUser){
  try{
    const usersRef = collection(db, "users");
    if(updatedUser.name && updatedUser.name !== user.name){
      const q = query(usersRef, where("name", "==", updatedUser.name));
      const querySnapshot = await getDocs(q);
      if(!querySnapshot.empty){
        return { status: false, message: "This name is already in use" };
      }
    }
    const userRef = doc(db, "users", id);
    await updateDoc(userRef, updatedUser);
    return { status: true, message: "User updated", updatedInfo: updatedUser };
  }
  catch(error){
    console.log(error);
    return { status: false, message: "An error occurred", error };
  }
}