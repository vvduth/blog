import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { RequestHandler } from "express";
import { nextTick } from "process";

export const protect: RequestHandler = asyncHandler(
  async (req, res, next) => {
    console.log("header", req.headers)
    next()
  }
  
);
