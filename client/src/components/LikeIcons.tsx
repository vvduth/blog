import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { sendLike } from "../store/postSlice";
const LikeIcons = () => {
  const post = useAppSelector((state: any) => state.post.post);
  const user = useAppSelector((state: any) => state.user.user);
  const dispatch = useAppDispatch();
  console.log(post);
  console.log(user);
  const [isActive, setIsActive] = useState(post.like_user_id.includes(user.id));
  const [likes, setLikes] = useState(post.likes)
  
  useEffect(()=> {
    setIsActive(post.like_user_id.includes(user.id)) ;
    setLikes(post.likes)
  }, [post.like_user_id, post.likes, user.id])

  const onClickHandler = async () => {
    await dispatch(sendLike(post.pid))
    if (!isActive) {
        setIsActive(true) 
        setLikes(likes+1)
    }
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
        color={isActive ? "blue" : "gray"}
        onClick = {onClickHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
        />
      </svg>
      <p>{likes} likes </p>
    </>
  );
};

export default LikeIcons;
