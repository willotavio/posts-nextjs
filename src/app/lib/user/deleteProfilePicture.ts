import { getStorage, deleteObject, ref } from "firebase/storage";

export default async function deleteProfilePicture(userPicture: string){
  try{
    const storage = getStorage();
    const deleteRef = ref(storage, userPicture);
    await deleteObject(deleteRef);
  }
  catch(error){
    console.log(error);
  }
}