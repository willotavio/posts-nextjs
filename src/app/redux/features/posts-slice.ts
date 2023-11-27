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
    },
    removePost: (state, action: PayloadAction<string>) => {
      let updatedPostsList = [];
      updatedPostsList = state.value.postsList.filter((post) => (
        post.id !== action.payload
      ));
      return {
        value: {
          postsList: updatedPostsList
        }
      }
    }
  }
});

export const { insertPost, removePost } = post.actions;
export default post.reducer;