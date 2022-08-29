import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { updateParticipants , getAllChannels} from "../store/socketSlide";
const ChatChannelSingle: FC<any> = (props) => {
  const dispatch = useAppDispatch()
  
  const channels = useAppSelector((state: any) => state.message.channels)
  const onClickHandler = async () => {
    
    dispatch(updateParticipants(props.channel.id))
    await dispatch(getAllChannels())
  }
  return (
    <div className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
      <img
        className="object-cover w-10 h-10 rounded-full"
        src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
        alt="username"
      />
      <div className="w-full pb-2">
        <div className="flex justify-between">
          <span className="block ml-2 font-semibold text-gray-600">
            {props.channel.name}
          </span>
          <span className="block ml-2 text-sm text-gray-600">6 hour</span>
        </div>
        <span className="block ml-2 text-sm text-gray-600">
          {props.channel.participants} participants
        </span>
      </div>

      
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={onClickHandler}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      
    </div>
  );
};

export default ChatChannelSingle;
