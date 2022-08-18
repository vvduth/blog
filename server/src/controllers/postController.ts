import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../dbConfig";

export const getAllPosts = asyncHandler(async (_req, res) => {
  pool.query(
    `SELECT users.username , posts.title, posts.body, posts.author
    FROM users 
    INNER JOIN posts
    ON users.uid = posts.user_id`,
    (err, result) => {
      if (err) {
        throw err;
      } else{
        
        res.status(201).json(result.rows)
      }
    }
  );
});
