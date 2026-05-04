import { useSelector } from "react-redux";
import { Fragment } from "react/jsx-runtime";
function ProfileTop(profile) {
  const profileState = useSelector((state) => state.profileReducer.profile);

  return (
    <div className="profile-top bg-primary p-2">
      {profileState && profileState.user && (
        <Fragment>
          <img
            className="round-img my-1"
            src={profileState.user.avatar}
            alt={profileState.user.name}
          />
          <h1 className="large">{profileState.user.name}</h1>
          <p className="lead">
            {profileState.status}{" "}
            {profileState.company && <span> at {profileState.company}</span>}
          </p>
          <p>{profileState.location && <span>{profileState.location}</span>}</p>
          <div className="icons my-1">
            {profileState.website && (
              <a
                href={profileState.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileState && profileState.social.twitter && (
              <a
                href={profileState.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileState.social.facebook && (
              <a
                href={profileState.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileState.social.linkedin && (
              <a
                href={profileState.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileState.social.instagram && (
              <a
                href={profileState.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
            {profileState.social.youtube && (
              <a
                href={profileState.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x"></i>
              </a>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default ProfileTop;
