'use client';

import { useDispatch } from "react-redux";
import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { AppDispatch, useAppSelector } from "../redux/store";
import { useEffect, useState } from "react";
import getPublicPosts from "../lib/post/getPublicPosts";
import { insertPost } from "../redux/features/posts-slice";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
}

export default function PublicPostsList({ user }: Props){
  const { status, data } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  const [fetchedAll, setFetchedAll] = useState(false);

  const [isBottom, setIsBottom] = useState(false);
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const threshold = 10;

    if(windowHeight + scrollTop + threshold >= scrollHeight){
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
    if(isBottom && !isLoading){
      const fillPosts = async () => {
        if(!fetchedAll){
          let res = await fetchPosts(postsList[postsList.length - 1].id);
          res.length < 5 && setFetchedAll(true);
          dispatch(insertPost([...postsList, ...res]));
        }
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
    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      dispatch(insertPost([]));
    }
  }, [data?.user.id]);

  let postsList = useAppSelector((state) => state.postReducer.value.postsList);
  return(
    <>
      {
        postsList
        &&
        !isLoading
        &&
        status === "authenticated"
        &&
        <div className="mb-20 flex flex-col items-center">
          {
            postsList.map((post) => (
              <PostCard key={ post.id } post={ post } user={ user } userSession={ data?.user } />
            ))
          }
        </div>
      }
    </>
  );
}