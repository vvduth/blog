import { Server } from "socket.io";
import bcrypt from "bcryptjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import logger from "morgan";
import { initializePassport } from "./passportConfig";
import path from "path";
import userRoutes from "./routers/userRoute";
import postRoute from "./routers/postRoute";
import chatRoute from "./routers/chatRoutes";
import { json } from "body-parser";
import { pool } from "./dbConfig";
import cors from "cors";
import generateToken from "./utils/generateToken";
import http from "http";
import { STATIC_CHANNELS } from "./controllers/chatController";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: any) => {
  // ...

  console.log("New client connected");
  socket.emit("connection", null);

  socket.on("channel-join", (id: any) => {
    console.log("channel join", id);
    STATIC_CHANNELS.forEach((c: any) => {
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      } else {
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });
    return id;
  });
  socket.on("send-message", (message: any) => {
    console.log("send mess", message)
    io.emit("message", message);
  });
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

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
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoute);
app.use("/api/chat", chatRoute);

const PORT = 5000 || process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
