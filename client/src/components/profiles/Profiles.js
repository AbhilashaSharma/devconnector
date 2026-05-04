import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
function Profiles() {
  const profile = useSelector((state) => state.profileReducer);
  const { isLoading, profiles } = profile;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Profiles;
