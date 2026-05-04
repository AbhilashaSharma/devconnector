import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profileReducer from "./profileReducer";
import posts from "./Posts";
export default combineReducers({
  alert,
  auth,
  profileReducer,
  postReducer: posts,
});
