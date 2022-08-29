import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { getProfileRequest } from "./userController";
import { pool } from "../dbConfig";

export const STATIC_CHANNELS = [{
  name: 'Global chat',
  participants: 0,
  id: 1,
  sockets: []
}, {
  name: 'Funny',
  participants: 0,
  id: 2,
  sockets: []
}];

export const getAllConversation = asyncHandler( async (req:getProfileRequest, res) => {
    pool.query(
        `SELECT 
        u.uid,u.username, con.conversation_id, con.user_id1, con.user_id2, con.receiver_name, con.sender
     FROM conversation con 
     INNER JOIN users u
     ON u.uid = con.user_id1 AND u.uid = $1
     OR u.uid = con.user_id2 AND u.uid = $1`,
        [req.user.uid],
        (err, result) => {
          if (err) {
            throw err;
          } else {

            res.status(201).json(result.rows)
          }
        }
      );
})

export const getAllChannels = asyncHandler(async(req, res) =>  {
  res.json({
    channels: STATIC_CHANNELS
  })
})

