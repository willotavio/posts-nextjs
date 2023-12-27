'use client';

import { useDispatch } from "react-redux";
import { User } from "../../../types";
import PostCard from "./PostCard";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import getPublicPosts from "../lib/post/getPublicPosts";
import { insertPost } from "../redux/features/posts-slice";

type Props = {
  user: User;
}

export default function PublicPostsList({ user }: Props){
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchPosts = async () => {
      let posts = await getPublicPosts();
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
          <PostCard key={ post.id } post={ post } user={ user } />
        ))
      }
    </div>
  );
}