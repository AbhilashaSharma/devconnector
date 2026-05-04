import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { addLikes, deletePost, removeLikes } from "../../actions/post";

function PostItem({ post, showActions }) {
  const { _id, text, name, avatar, user, likes, comments } = post;

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
        {/* <p className="post-date">Posted on </p> */}
        {showActions && (
          <Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(addLikes(_id))}
            >
              <i className="fas fa-thumbs-up"></i>
              {likes.length > 0 && <span>{likes.length}</span>}
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(removeLikes(_id))}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.isloading && user === auth.user._id && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => dispatch(deletePost(_id))}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default PostItem;
