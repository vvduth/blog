import asyncHandler from "express-async-handler";
import express, { Request, Response, NextFunction } from "express";
import { pool } from "../dbConfig";
import { getProfileRequest } from "./userController";
export const getAllPosts = asyncHandler(async (_req, res) => {
  pool.query(
    `SELECT users.username , posts.title, posts.body, posts.author, posts.pid, posts.date_created, posts.likes
    FROM users 
    INNER JOIN posts
    ON users.uid = posts.user_id`,
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.status(201).json(result.rows);
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
        throw err;
      }
      if (result.rows.length > 0) {
        console.log(result.rows[0]);
        res.status(201).json(result.rows[0]);
      } else {
        res.status(501).json({
          message: "This post no longer exist, we are sorry for this.",
        });
      }
    }
  );
});

export const sendLikes = asyncHandler(async (req: getProfileRequest, res) => {
  const uid = req.user.uid;
  const post_id = req.params.pid;

  const values = [uid, post_id];

  const query = {
    text: `UPDATE posts
    SET like_user_id = like_user_id || ${uid}, likes = likes + 1
    WHERE NOT (SELECT '{${uid}}' && like_user_id)
    AND pid = ($1)`,
    values: [post_id],
    rowMode: "array",
  };
  console.log(values);
  pool.query(query, (q_err, q_res) => {
    if (q_err) {
      throw q_err;
    }

    if (q_res) {
      pool.query(
        `SELECT likes, like_user_id FROM posts
      WHERE pid=$1`,
        [post_id],
        (err, result) => {
          if (err) {
            throw err;
          }
          if (result) {
            res.json(result.rows[0]);
          } else {
            res
              .status(500)
              .json({
                message: "Sonething wrong happened, please try again later.",
              });
          }
        }
      );
    }
  });
});

export const postComments = asyncHandler(
  async (req: getProfileRequest, res) => {
    const user_id = req.user.uid;
    const post_id = req.params.pid;
    const username = req.user.username;
    const { comment } = req.body;

    pool.query(
      `INSERT INTO comments(comment, user_id, username, post_id, date_created)
  VALUES($1, $2, $3, $4, NOW()) RETURNING *`,
      [comment, user_id, username, post_id],
      (err, result) => {
        if (err) {
          throw err;
        }
        if (result) {
          //console.log(result.rows)
          res.json(result.rows[0]);
        }
      }
    );
  }
);

export const getAllComments = asyncHandler(async (req, res) => {
  const post_id = req.params.pid;
  pool.query(
    `SELECT 
     u.username ,cm.comment, cm.post_id, cm.date_created, cm.cid, cm.user_id
   
   FROM comments  cm
   INNER JOIN posts AS p 
   ON p.pid = cm.post_id
   AND cm.post_id = $1
   INNER JOIN users u
   ON u.uid = cm.user_id`,
    [post_id],
    async (err, result) => {
      if (err) {
        throw err;
      }
      if (result.rows.length >= 0) {
        //console.log(result.rows);
        res.status(201).json(result.rows);
      } else {
        res.status(501).json({
          message: "This post no longer exist, we are sorry for this.",
        });
      }
    }
  );
});
