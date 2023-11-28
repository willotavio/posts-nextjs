export type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  aud?: string | null | undefined;
  azp?: string | null | undefined;
  email_verified?: boolean | null | undefined;
  exp?: number | null | undefined;
}

export type FirestoreUser = {
  email?: string;
  name?: string;
  image?: string
}

export type Post = {
  id?: string;
  content: string;
  userId?: string,
  userEmail?: string;
  userName?: string;
  userPic?: string;
  date: string;
  visibility: string
}