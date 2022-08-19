import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "./HomeScreen";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getOnePost } from "../store/postSlice";

const PostScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOnePost(params.pid));
  }, [dispatch, params.pid]);

  const post = useAppSelector((state) => state.post.post);
  const state = useAppSelector((state) => state);
  console.log(state);
  //console.log(params)

  if (post) {
    console.log("from post screen", post.title);
  }
  return (
    <>
      {post ? (
        <>
          <h1>{post.title}</h1>
          <Link to={'/'}>Go back</Link>
        </>
      ) : null}
    </>
  );
};

export default PostScreen;
