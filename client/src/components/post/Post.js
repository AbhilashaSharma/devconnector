import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

function Post() {
  const { posts, isloading } = useSelector((state) => state.postReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Fragment>
      {isloading ? (
        <h2>Loading...</h2>
      ) : (
        <Fragment>
          <h1 className="large text-primary">Posts</h1>
          <p className="lead">
            <i className="fas fas-user"></i>Welcome to the community
          </p>
          <PostForm />
          <div className="posts">
            {posts &&
              posts.map((post) => (
                <PostItem key={post._id} post={post} showActions={true} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Post;
