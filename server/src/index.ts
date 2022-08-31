
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

import http from "http";
import { STATIC_CHANNELS } from "./controllers/chatController";
import { ServerSocket } from "./webSocket/socket";
const app = express();

// this is http server
const server = http.createServer(app);

// start the socket server
new ServerSocket(server) ;

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
