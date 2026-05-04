import React, { Fragment } from "react";

function ProfileAbout({ profile }) {
  return (
    <div className="profile-about bg-light p-2">
      {profile && profile.bio && (
        <Fragment>
          <h2 className="text-primary">
            {profile.user.name.trim().split(" ")[0]}'s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className="line" />
        </Fragment>
      )}
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile &&
          profile.skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fas fa-check"></i> {skill}
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProfileAbout;
