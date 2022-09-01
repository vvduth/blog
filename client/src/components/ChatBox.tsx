import React, { useContext, useEffect } from "react";
import SocketContext from "../context/Context";
import { getAllChannels, updateParticipants } from "../store/socketSlide";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ChatChannelList from "./ChatChannelList";
import MessagePanel from "./MessagePanel";

const ChatBox = () => {
  const { socket } = useContext(SocketContext).SocketState;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);
  const allChannels = useAppSelector((state: any) => state.message.channels);
  const selectedChannel = useAppSelector(
    (state: any) => state.message.selectedChannel
  );
  

  return (
    <>
      {/* {allChannels ? (
        <div>
          {allChannels.map((channel:any) => (
            <div key={channel.id}>
              <h1>
                <strong>
                  {channel.id}. {channel.name}
                </strong>
              </h1>
              <br />
              <h2>{channel.participants} members</h2>
              <br />
              <button onClick={() => (onClickHandler(channel.id))}>Join</button>
            </div>
          ))}
        </div>
      ) : (
        <p>no</p>
      )}
      <br/>
      <p>Channel {selectedChannel ? (<>{selectedChannel.id}</>): (<>rightnow, nothinng</>)} is selected </p> */}

      <div className="container mx-auto">
        <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
          <ChatChannelList />
          <MessagePanel />
        </div>
      </div>
    </>
  );
};

export default ChatBox;
