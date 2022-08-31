import React, { FC, useContext, useEffect } from "react";
import ChatChannelSingle from "./ChatChannelSingle";
import { Channel, getAllChannels, updateParticipants } from "../store/socketSlide";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import SocketContext from "../context/Context";
const ChatChannelList: FC<any> = (props) => {
  

  const { socket } = useContext(SocketContext).SocketState;
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user)
  
  
  const allChannels = useAppSelector((state: any) => state.message.channels);
  const selectedChannel = useAppSelector((state: any ) => state.message.selectedChannel)
  const onClickHandler = async (id:any) => {
    console.log(id)
     
    //dispatch(getAllChannels());
     socket.emit("channel-join", ({id, user: user}), (_ack: any) => {
      /* TODO document why this arrow function is empty */
     });
     await dispatch(getAllChannels())
     dispatch(updateParticipants(id))
  }
  return (
    <>
      {allChannels ? (
        
        <ul className="overflow-auto h-[32rem]">
          <h2 className="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
          <li>
            {allChannels.map((c: any) => (
              
              <ChatChannelSingle key={c.id} channel={c}/>
              
              
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
