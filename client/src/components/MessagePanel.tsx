import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {  setUpAndUpdateSocket } from "../store/socketSlide";
import { sendMessage } from "../store/socketSlide";

const MessagePanel = () => {
  const selectedChannel = useAppSelector(
    (state: any) => state.message.selectedChannel
  );
  const user = useAppSelector((state: any) => state.user.user);
  const socket = useAppSelector((state: any) => state.message.socket);
  const channels = useAppSelector((state: any) => state.message.channels);


  

  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const handleMessageSubmit = async (e: any) => {
    e.preventDefault();
    console.log("trigger");
    //dispatch(updateSocket({}))
    //dispatch(setUpAndUpdateSocket())
    
    dispatch(
      sendMessage({
        channel_id: selectedChannel!.id,
        text: text,
        senderName: user.username,
        user_id: user.id,
      })
    );
  };
  return (
    <>
      {selectedChannel ? (
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center p-3 border-b border-gray-300">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src="https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383__340.jpg"
                alt="username"
              />
              <span className="block ml-2 font-bold text-gray-600">Emma</span>
              <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
            </div>
          </div>
          <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
            <ul className="space-y-2">
              {
                selectedChannel.messages ? ( <>
                    {selectedChannel.messages.map((mes:any) => (
                      <li key={mes.text + mes.user_id + Math.random()} className="flex justify-start">
                      <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                        <span className="block">{mes.text}</span>
                      </div>
                    </li>
                    ) )}
                </>): (<>no</>)
              }
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">Hiiii</span>
                </div>
              </li>
              <li className="flex justify-end">
                <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                  <span className="block">how are you?</span>
                </div>
              </li>
              
            </ul>
          </div>
          <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
            <form onSubmit={handleMessageSubmit}>
              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                name="message"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                required
              />
              <button type="submit">
                <svg
                  className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden lg:col-span-2 lg:block">
          <p>Click on chat channel to start the convos</p>
        </div>
      )}
    </>
  );
};

export default MessagePanel;
