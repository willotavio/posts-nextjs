import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { User } from "../../../../types";
import { v4 } from "uuid";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import deleteImage from "./deleteImage";

export default async function changeProfileCover(image: File, user: User){
  if(!image){
    return { status: false, message: "Image not provided" };
  }
  if(image.type !== "image/jpeg" && image.type !== "image/png"){
    return { status: false, message: "Invalid image type" };
  }
  try{
    const storage = getStorage();
    const storageRef = ref(storage, `profile-covers/${ user.name + "-" + v4() }`);
    
    const result = await uploadBytes(storageRef, image);
    const downloadRef = await getDownloadURL(result.ref);

    const userRef = doc(db, "users", user.id as string);
    const userData = await getDoc(userRef);
    const userCover = await userData.data()?.cover;

    await deleteImage(userCover);

    await updateDoc(userRef, { cover: downloadRef });
    return { status: true, message: "Updated" };
  }
  catch(error){
    console.log(error);
    return { status: false, message: "Error" };
  }
}