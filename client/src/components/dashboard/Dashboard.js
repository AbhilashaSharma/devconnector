import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

function Dashboard() {
  const dispatch = useDispatch();

  const { profile, isLoading } = useSelector((state) => state.profileReducer);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            {" "}
            <i className="fas fa-user"></i> Welcome{" "}
            {profile && profile.user && profile.user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <DashboardActions />
              <Experience experience={profile.experience} />
              <Education education={profile.education} />
              <div className="my-2">
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteAccount())}
                >
                  <i className="fas fa-user-minus"></i> Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
}

export default Dashboard;
