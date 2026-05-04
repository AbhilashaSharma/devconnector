import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";

function Profile() {
  let params = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profileReducer);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProfileById(params.user_id));
  }, [dispatch, params.user_id]);
  return (
    <Fragment>
      {profile === null || profile.isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            {" "}
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.isLoading === false &&
            auth.user._id === (profile.profile && profile.profile.user._id) && (
              <Link to="/edit-profile" className="btn btn-dark">
                {" "}
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile.profile} />
            <ProfileAbout profile={profile.profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profile;
