import { getStorage, ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { db } from "../../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";
import { User } from "../../../../types";
import deleteProfilePicture from "./deleteProfilePicture";

export default async function postImage(image: File, user: User){
  if(!image){
    return false;
  }
  if(image.type !== "image/jpeg" && image.type !== "image/png"){
    return false;
  }
  try{
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${user.name + "-" + v4()}`);

    const result = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(result.ref);

    const userDocRef = doc(db, "users", user.id as string);
    const userDocDate = await getDoc(userDocRef);
    const userPicture = await userDocDate.data()?.image;

    await deleteProfilePicture(userPicture);

    updateDoc(userDocRef, { image: url });
    return true;
  }
  catch(error){
    console.log(error);
    return false;
  }
}