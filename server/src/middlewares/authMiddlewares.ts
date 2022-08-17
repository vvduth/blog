import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { nextTick } from "process";
import { pool } from "../dbConfig";
import { getProfileRequest } from "../controllers/userController";

export const protect: RequestHandler = asyncHandler(async (req, res, next) => {
  let token: string;
  let userOutput;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as any
      ) as JwtPayload;
      pool.query(
        `SELECT uid, username, email, role FROM  users WHERE uid=$1`,
        [decoded.id],
        async (err, result) => {
          if (err) {
            throw err;
          }
          console.log("REsult", result.rows[0]);
          if (result) {
            req.user = result.rows[0];
          }
          console.log("From middlewares", req.user);
          next();
        }
      );
    } catch (e) {
      console.error(e);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
});
