'use client';

import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/posts-slice";
import { useEffect } from "react";
import getUserPosts from "../lib/post/getUserPosts";

type Props = {
  user: User;
}

export default function UserPostsList({ user }: Props){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getUserPosts(user.id as string);
      dispatch(insertPost(posts));
    }
    fetchPosts();
  }, []);

  let postsList = useAppSelector((state) => state.postReducer.value.postsList);
  postsList = postsList.slice().sort((a, b) => {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return(
    <div>
      {
        postsList
        &&
        postsList.map((post) => (
          <PostCard key={ post.id } post={ post } user={ user as User }/>
        ))
      }
    </div>
  );
}