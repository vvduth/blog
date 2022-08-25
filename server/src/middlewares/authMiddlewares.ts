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
          if (result) {
            req.user = result.rows[0];
          }
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

export const admin: RequestHandler = (req:any,res, next) => {
  if (req.user && req.user.role ) {
    next() ;

  } else {
    res.status(401) ;
    throw new Error("Not authorize as an admin")
  }
}

