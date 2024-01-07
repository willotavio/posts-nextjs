import { getStorage, deleteObject, ref } from "firebase/storage";

export default async function deleteImage(image: string){
  if(image === "https://firebasestorage.googleapis.com/v0/b/fir-posts-759fa.appspot.com/o/profile-covers%2Fdefault.jpg?alt=media&token=2f001989-1020-4209-ac92-7632dd513a27"){
    return false;
  }
  try{
    const storage = getStorage();
    const deleteRef = ref(storage, image);
    await deleteObject(deleteRef);
  }
  catch(error){
    console.log(error);
  }
}