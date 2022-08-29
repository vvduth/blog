import React, { FC } from "react";
import ChatChannelSingle from "./ChatChannelSingle";
import { Channel } from "../store/socketSlide";
import { useAppSelector } from "../store/hooks";
const ChatChannelList: FC<any> = (props) => {
  

  const channels : Channel[]  = useAppSelector((state:any) => (state.message.channels) )
  return (
    <>
      {channels ? (
        
        <ul className="overflow-auto h-[32rem]">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li>
            {channels.map((c: any) => (
              <>
              <ChatChannelSingle key={c.id} channel={c}/>
              
              </>
              
              
            ))}
          </li>
          
        </ul>
      ) : (
        <div className="channel-list">
          there is no channel yet, please come back later
        </div>
      )}
    </>
  );
};

export default ChatChannelList;
