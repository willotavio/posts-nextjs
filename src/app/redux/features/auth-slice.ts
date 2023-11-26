import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../../../../types";

type initialState = {
  value: PostState;
}

type PostState = {
  postsList: Post[];
}

const initialState = {
  value: {
    postsList: []
  } as PostState,
} as initialState;

export const post = createSlice({
  name: "post",
  initialState,
  reducers: {
    insertPost: (state, action: PayloadAction<Post[]>) => {
      return {
        value: {
          postsList: action.payload
        }
      }
    }
  }
});

export const { insertPost } = post.actions;
export default post.reducer;