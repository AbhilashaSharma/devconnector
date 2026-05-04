import {
  ADD_COMMENT,
  ADD_POST,
  DELETE_POST,
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  REMOVE_COMMENT,
  UPDATE_LIKES,
} from "../actions/types";

const initState = {
  posts: [],
  post: null,
  isLoading: true,
  error: {},
};

export default function posts(state = initState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        isLoading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isLoading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.id
            ? {
                ...post,
                likes: action.payload.likes,
              }
            : post,
        ),
        isLoading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        isLoading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        isLoading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== action.payload,
          ),
        },
      };
    default:
      return state;
  }
}
