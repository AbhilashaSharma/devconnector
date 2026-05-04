import axios from "axios";
import {
  GET_POSTS,
  UPDATE_LIKES,
  POST_ERROR,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//get post by id
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
//Add Likes
export const addLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//remove Likes
export const removeLikes = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/post/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("Post Removed", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//add post
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(`/api/post`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert("Post Added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post(
      `/api/post/comment/${postId}`,
      formData,
      config,
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};

//remove comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: error.response.data,
    });
  }
};
