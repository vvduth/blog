import React, { FC } from "react";

export interface CommentSingle {
  uid: number;
  cid: number ; 
  username: string;
  pid: number;
  title: string;
  comment: string;
  post_id: string;
  date_created: string;
}

export interface CommentProps {
  comments: CommentSingle[] | [];
}
const CommentSection: FC<CommentProps> = (props) => {
  return (
    <>
      {props.comments.length > 0 ? (
        <>
          {props.comments.map((comment) => (
            <div key={comment.cid} className="flex w-full items-center font-sans px-4 py-12">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="http://i.pravatar.cc/300"
                alt="Avatar of Author"
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
                  Posted at {comment.date_created.split('T')[0]}
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
                    This UI was inspired by {" "}
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
    </>
  );
};

export default CommentSection;
