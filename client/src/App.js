import { useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashbaord from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import SinglePost from "./components/post/SinglePost";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Fragment>
        <Navbar />
        <section className="container">
          <Alert />
        </section>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/profile/:user_id" element={<Profile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashbaord />} />
            <Route path="/create-profile" element={<CreateProfile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/add-experience" element={<AddExperience />} />
            <Route path="/add-education" element={<AddEducation />} />
            <Route path="/post" element={<Post />} />
            <Route path="/post/:id" element={<SinglePost />} />
          </Route>
        </Routes>
      </Fragment>
    </Provider>
  );
}

export default App;
