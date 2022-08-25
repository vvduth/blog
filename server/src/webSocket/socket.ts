import {Server as HTTPServer} from 'http'
import { Socket, Server } from 'socket.io'

export class ServerSocket {
    public static instance : ServerSocket 
    public io: Server

    // mastrer list of all connected usersd
    public users: {[uid: string | number]: string | number} ;

    constructor (server: HTTPServer) {
        ServerSocket.instance = this ; 
        this.users =  {} 
        this.io = new Server (server ,{
            serveClient: false , 
            pingInterval: 10000, 
            pingTimeout: 5000, 
            cookie: false,
            cors: {
                origin: '*'
            }
        })

        this.io.on('connect', this.StartListeners)

        console.log("Socket io started")
    }
    StartListeners = (socket: Socket) => {
        console.info("Message received from " + socket.id) ; // come from socket io

        socket.on("handshake", () => {
            console.info("Handshake receivved from " + socket.id) ;
        })  // custom mes that dont come from socket.io

        socket.on('disconnect', () => {
            console.log("A disconnection received from " + socket.id  )
        })
    }
}