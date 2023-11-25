import { Post } from "../../../types";

type Props = {
  post: Post
}

export default function PostCard({ post }: Props){
  return(
    <div className="m-auto w-80 min-h-fit border-2 border-gray-200 p-2 rounded-md">
      <div className="grid grid-cols-3 mb-2 [*_&]:text-xs">
        <img className="rounded-full w-10" src={post.userPic} alt="user picture" />
        <p>{post.userName}</p>
        <p>{post.date.split(" ")[0]}</p>
      </div>
      <p className="text-justify break-words">{post.content}</p>
    </div>
  );
}