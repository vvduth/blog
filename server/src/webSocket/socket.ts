import { Server as HttpServer } from 'http';
import { Socket, Server } from 'socket.io';
import { v4 } from 'uuid';
import { STATIC_CHANNELS } from '../controllers/chatController';

export class ServerSocket {
    public static instance: ServerSocket;
    public io: Server;

    /** Master list of all connected users */
    public users: any[];

    constructor(server: HttpServer) {
        ServerSocket.instance = this;
        this.users = [];
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: '*'
            }
        });

        this.io.on('connect', this.StartListeners);
    }

    StartListeners = (socket: Socket) => {
        console.info('Message received from ' + socket.id);

        

        socket.on('handshake', () => {
            console.info('Handshake received from: ' + socket.id);
        });

        socket.on('channel-join', id => {
            console.info('someone has joined channed ',id )
            STATIC_CHANNELS.forEach(c => {
                if (c.id === id) {
                    if (c.sockets.indexOf(socket.id)== (-1)) {
                        c.sockets.push(socket.id) ;
                        c.participants ++ ;
                        this.io.emit('channel', c) ;
                    }
                } else {
                    let index = c.sockets.indexOf(socket.id) ;
                    if (index != (-1)) {
                        c.sockets.splice(index,1) ;
                        c.participants--;
                        this.io.emit('channel', c)
                    }
                }
            })
        })

        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);
        });
    };

    
}
