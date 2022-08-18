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



const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
)

initializePassport(passport)
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

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (_req: Request, res: Response) => {
  res.send("<p>Hello and welcome</p>");
});

app.use("/api/users",userRoutes );
app.use("/api/posts", postRoute)

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
