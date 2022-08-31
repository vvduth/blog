import React, { useContext, useEffect } from "react";
import SocketContext from "../context/Context";
import { getAllChannels, updateParticipants } from "../store/socketSlide";
import { useAppDispatch, useAppSelector } from "../store/hooks";




const ChatBox = () => {
  const { socket } = useContext(SocketContext).SocketState;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllChannels());
  }, [dispatch]);
  const allChannels = useAppSelector((state: any) => state.message.channels);
  const selectedChannel = useAppSelector((state: any ) => state.message.selectedChannel)
  const onClickHandler = (id:any) => {
    console.log(id)
    //dispatch(updateParticipants(id))
    dispatch(getAllChannels());
    socket.emit("channel-join", id, (_ack: any) => {
      /* TODO document why this arrow function is empty */
     });
  }
  return (
    <>
      {allChannels ? (
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
      <p>Channel {selectedChannel ? (<>{selectedChannel.id}</>): (<>rightnow, nothinng</>)} is selected </p>
    </>
  );
};

export default ChatBox;
