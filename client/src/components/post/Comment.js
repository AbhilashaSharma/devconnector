import React from "react";
import { Link } from "react-router";
import { removeComment } from "../../actions/post";
import { useSelector, useDispatch } from "react-redux";

function Comment({ comment, postId }) {
  const { _id, text, name, avatar, user } = comment;
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt={name} />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => dispatch(removeComment(postId, _id))}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Comment;
