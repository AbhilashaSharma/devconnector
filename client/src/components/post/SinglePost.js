import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../actions/post";
import { useParams } from "react-router";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

function SinglePost() {
  const params = useParams();
  const dispatch = useDispatch();
  const { post, isLoading } = useSelector((state) => state.postReducer);

  useEffect(() => {
    dispatch(getPost(params.id));
  }, [dispatch, params.id]);
  return isLoading && post === null ? (
    <h2>Loading...</h2>
  ) : (
    <Fragment>
      <PostItem post={post && post} showActions={false} />
      <CommentForm postId={post && post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            postId={post && post._id}
          />
        ))}
      </div>
    </Fragment>
  );
}

export default SinglePost;
