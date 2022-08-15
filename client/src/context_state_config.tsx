import React, { useReducer } from "react";
import {
  remove_db_posts,
  remove_db_profile,
  set_db_posts,
  set_db_profile,
} from "./actions/actions";
import Context from "./utils/context";
import {
  AuthReducer,
  initialState as authInitalState,
} from "./reducer/authReducer";
import {
  PostsReducer,
  initialState as postInitialState,
} from "./reducer/postReducer";

const ContextState = () => {
  const [statePost, dispatchPost] = useReducer(PostsReducer, postInitialState);

  const handleSetPosts = (posts: any) => {
    dispatchPost(set_db_posts(posts));
  };

  const handleRemovePosts = () => {
    dispatchPost(remove_db_posts());
  };

  const [stateAuth, dispatchAuth] = useReducer(AuthReducer, authInitalState);

  const handleDBProfile = (profile: any) => {
    dispatchAuth(set_db_profile(profile));
  };

  const handleRemoveDBProfile = () => {
    dispatchAuth(remove_db_profile());
  };

  return (
    <>
      <Context.Provider
        value={{
          dbProfileState: stateAuth.db_profile,

          handleAddDBProfile: (profile: any) => handleDBProfile(profile),
          handleRemoveDBProfile: () => handleRemoveDBProfile(),

          //Posts State
          postsState: statePost.posts,
          handleAddPosts: (posts: any) => handleSetPosts(posts),
          handleRemovePosts: () => handleRemovePosts(),
        }}
      >
        {" "}
      </Context.Provider>
    </>
  );
};

export default ContextState;
