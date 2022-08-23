import React, { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAllComments, postComment } from "../store/commentSlice";
import { useParams } from "react-router-dom";
export interface CommentSingle {
  uid?: number;
  cid: number;
  username: string;
  pid?: number;
  title: string;
  comment: string;
  post_id: string;
  date_created: string;
  user_id: number;
}

export interface CommentProps {
  paramsID: any, 
  comments: CommentSingle[] | [];
}

const CommentSection: FC<CommentProps> = (props) => {
  const dispatch = useAppDispatch() 
  const [body, setA] = useState<string>('')
  const comments = useAppSelector((state) => state.comment.comments);
  useEffect(() => {
    dispatch(getAllComments(props.paramsID))
  }, [dispatch, props.paramsID]);

  const onSubmitHandler = async (e:any) => {
    e.preventDefault() ; 
    console.log("trigger") ;
    await dispatch(postComment({postId: props.paramsID,comment:body}))
    setA('') ;
  }
  return (
    <>
      { comments && comments.length > 0 ? (
        <>
          {comments.map((comment) => (
            <div
              key={comment.cid}
              className="flex w-full items-center font-sans px-4 py-12"
            >
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="http://i.pravatar.cc/300"
                alt="Avatar of username"
              />
              <div className="flex-1 px-2">
                <p className="text-base font-bold text-base md:text-xl leading-none mb-2">
                  {comment.username}
                </p>
                <p className="text-gray-600 text-xs md:text-base">
                  {comment.comment}{" "}
                  {/* <a
                    className="text-green-500 no-underline hover:underline"
                    href="https://www.tailwindtoolbox.com"
                  >
                    TailwindToolbox.com
                  </a> */}
                </p>
              </div>
              <div className="justify-end">
                <button className="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">
                  Posted at {comment.date_created.split("T")[0]}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex w-full items-center font-sans px-4 py-12">
            <div className="flex-1 px-2">
              <p className="text-base font-bold text-base md:text-xl leading-none mb-2">
                This post has no comments yet
              </p>
              <p className="text-gray-600 text-xs md:text-base">
                This UI was inspired by{" "}
                <a
                  className="text-green-500 no-underline hover:underline"
                  href="https://www.tailwindtoolbox.com"
                >
                  TailwindToolbox.com
                </a>
              </p>
            </div>
          </div>
        </>
      )}
      <div id="section2" className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray">
        <form onSubmit={onSubmitHandler}>
          

          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                htmlFor="my-textarea"
              >
                Your comment
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="form-textarea block w-full focus:bg-white border-black"
                id="my-textarea"
                rows={8}
                value={body}
                
                onChange={(e) => {
                  setA(e.target.value);
                }}
              ></textarea>
              <p className="py-2 text-sm text-gray-900">
                Type your comment in the textbox above
              </p>
            </div>
          </div>

          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-yellow-700 hover:bg-yellow-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Save comment
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CommentSection;
