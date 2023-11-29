import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../config/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function postImage(image: File, id: string){
  if(!image){
    return false;
  }
  if(image.type !== "image/jpeg" && image.type !== "image/png"){
    return false;
  }
  try{
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${id}`);

    const result = await uploadBytes(storageRef, image);

    const url = await getDownloadURL(result.ref);

    const d = doc(db, "users", id);
    await updateDoc(d, {image: url});
    return true;
  }
  catch(error){
    console.log(error);
    return false;
  }
}