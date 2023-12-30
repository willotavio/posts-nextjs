'use client';

import { useDispatch } from "react-redux";
import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import getPublicPosts from "../lib/post/getPublicPosts";
import { insertPost } from "../redux/features/posts-slice";

type Props = {
  user: User;
}

export default function PublicPostsList({ user }: Props){
  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if(windowHeight + scrollTop === scrollHeight){
      setIsBottom(true);
    }
    else{
      setIsBottom(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);
  useEffect(() => {
    if(isBottom){
      const fillPosts = async () => {
        let res = await fetchPosts(postsList[postsList.length - 1].id);
        dispatch(insertPost([...postsList, ...res]));
      }
      fillPosts();
    }
  }, [isBottom]);

  const fetchPosts = (startAfterId?: string) => {
    const fetch = async () => {
      let res: Post[];
      if(startAfterId){
        res = await getPublicPosts(startAfterId);
      }
      else{
        res = await getPublicPosts();
      }
      return res;
    }
    return fetch();
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fillPosts = async () => {
      let posts = await getPublicPosts();
      dispatch(insertPost(posts));
    }
    fillPosts();
  }, []);

  let postsList = useAppSelector((state) => state.postReducer.value.postsList);
  postsList = postsList.slice().sort((a, b) => {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return(
    <div className="mb-20">
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