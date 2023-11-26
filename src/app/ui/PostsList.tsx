'use client';

import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/auth-slice";
import { useEffect } from "react";

type Props = {
  user: User;
  posts: Post[];
}

export default function PostsList({user, posts}: Props){
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(insertPost(posts));
  }, [dispatch, posts]);
  let postsList = useAppSelector((state) => state.postReducer.value.postsList);
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