import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../dbConfig";

export const getAllPosts = asyncHandler(async (_req, res) => {
  pool.query(
    `SELECT users.username , posts.title, posts.body, posts.author, posts.pid, posts.date_created
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

export const getOnePostById = asyncHandler(async (req, res) => {
  pool.query( 
    `SELECT * FROM posts
    WHERE pid=$1`,
    [req.params.pid],
    async (err, result) => {
      if (err) {
        throw err
      }
      if (result.rows.length > 0 ) {
        console.log(result.rows[0])
        res.status(201).json(result.rows[0])
      } else {
        res.status(501).json({message: "This post no longer exist, we are sorry for this."})
      }
    }
  )
})
