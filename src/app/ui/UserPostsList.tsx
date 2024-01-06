'use client';

import { Post, User } from "../../../types";
import PostCard from "./PostCard";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { insertPost } from "../redux/features/posts-slice";
import { useEffect, useState } from "react";
import getUserPosts from "../lib/post/getUserPosts";
import { useSession } from "next-auth/react";

type Props = {
  user: User;
}

export default function UserPostsList({ user }: Props){
  const { status, data } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  const [fetchedAll, setFetchedAll] = useState(false);

  const handleScroll = () => {
    const windowHeigth = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const threshold = 10;

    if(windowHeigth + scrollTop + threshold >= scrollHeight){
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
    if(isBottom && !isLoading){
      const fillPosts = async () => {
        if(postsList.length > 0 && !fetchedAll){
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
        res = await getUserPosts(user.id as string, data?.user.email === user.email ? undefined : "public", startAfterId);
      }
      else{
        res = await getUserPosts(user.id as string, data?.user.email === user.email ? undefined : "public");
      }
      return res;
    }
    return fetch();
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fillPosts = async () => {
      let posts: Post[];
      posts = await getUserPosts(user.id as string, data?.user.email === user.email ? undefined : "public");
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
        status == "authenticated"
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