export type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  aud?: string | null | undefined;
  azp?: string | null | undefined;
  email_verified?: boolean | null | undefined;
  exp?: number | null | undefined;
}

export type Post = {
  id?: string;
  content: string;
  userEmail: string;
  userName: string;
  userPic: string;
  date: string;
  visibility: string
}