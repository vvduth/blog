import React, { useContext } from 'react';
import SocketContext from '../context/Context';

export interface IChatBoxChildrenProps {}

const ChatBoxChildren: React.FunctionComponent<IChatBoxChildrenProps> = (props) => {
    const { socket } = useContext(SocketContext).SocketState;

    return (
        <div>
            <h2>Socket IO Information:</h2>
        </div>
    );
};

export default ChatBoxChildren;