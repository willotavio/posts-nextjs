'use client';

import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/posts-slice";
import { useEffect, useState } from "react";
import getUserPosts from "../lib/post/getUserPosts";

type Props = {
  user: User;
}

export default function UserPostsList({ user }: Props){
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    const windowHeigth = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if(windowHeigth + scrollTop === scrollHeight){
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
  const [isBottom, setIsBottom] = useState(false);
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
        res = await getUserPosts(user.id as string, startAfterId);
      }
      else{
        res = await getUserPosts(user.id as string);
      }
      return res;
    }
    return fetch();
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fillPosts = async () => {
      let posts = await getUserPosts(user.id as string);
      dispatch(insertPost(posts));
    }
    fillPosts();
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
  }, []);

  let postsList = useAppSelector((state) => state.postReducer.value.postsList);

  return(
    <div className="mb-20">
      {
        postsList
        &&
        isLoading
        &&
        postsList.map((post) => (
          <PostCard key={ post.id } post={ post } user={ user as User }/>
        ))
      }
    </div>
  );
}