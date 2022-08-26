import { Server  } from "socket.io";
import bcrypt from "bcryptjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import logger from "morgan";
import { initializePassport } from "./passportConfig";
import path from "path";
import userRoutes from './routers/userRoute'
import postRoute from './routers/postRoute'
import { json } from "body-parser";
import { pool } from "./dbConfig";
import cors from 'cors'
import generateToken from "./utils/generateToken";
import http from 'http'



const app = express();

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
})


io.on("connection", (socket) => {
  // ...
  console.log("new websocket connection")

  socket.emit('message', 'welcome to chat support, how may I help you?')

  //broastcast when one user connected
  socket.broadcast.emit('message', 'A user has joined the chat') ;

  socket.on('disconnect',  () => {
    io.emit('message', 'A user has left the chat')
  })
});


app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
)



app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use(json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);



app.get("/", (_req: Request, res: Response) => {
  res.send("<p>Hello and welcome</p>");
});

app.use("/api/users",userRoutes );
app.use("/api/posts", postRoute)

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
