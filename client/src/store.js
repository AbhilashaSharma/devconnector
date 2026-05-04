import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const initState = {};
const store = configureStore({
  reducer: rootReducer,
  initState,
});

export default store;
