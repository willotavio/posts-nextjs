export type User = {
  id?: string | null | undefined;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  aud?: string | null | undefined;
  azp?: string | null | undefined;
  email_verified?: boolean | null | undefined;
  exp?: number | null | undefined;
  description?: string | null | undefined;
  cover?: string | null | undefined;
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  image: string;
  description: string;
  cover: string;
}

export type TUpdateUser = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
  description?: string;
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

export type TUpdatePost = {
  id?: string;
  content?: string;
  userId?: string,
  date?: string;
  visibility?: string
}