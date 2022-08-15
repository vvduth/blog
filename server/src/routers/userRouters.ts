import express from "express";
import { pool } from "../db";

const router = express.Router();

router.post('/posts/userprofiletodb', (req, res, next) => {
    const values = [req.body.profile.nickname, 
                    req.body.profile.email, 
                    req.body.profile.email_verified]
    pool.query(`INSERT INTO users(username, email, email_verified, date_created)
                VALUES($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  router.get('/get/userprofilefromdb', (req, res, next) => {
    const email = req.query.email
    console.log(email)
    pool.query(`SELECT * FROM users
                WHERE email=$1`, [ email ],
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  
  router.get('/get/userposts', (req, res, next) => {
    const user_id = req.query.user_id
    console.log(user_id)
    pool.query(`SELECT * FROM posts
                WHERE user_id=$1`, [ user_id ],
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  // Retrieve another users profile from db based on username 
  router.get('/get/otheruserprofilefromdb', (req, res, next) => {
    // const email = [ "%" + req.query.email + "%"]
    const username = String(req.query.username)
    pool.query(`SELECT * FROM users
                WHERE username = $1`,
      [ username ], (q_err, q_res) => {
      res.json(q_res.rows)
    });
  });
  
  //Get another user's posts based on username
  router.get('/get/otheruserposts', (req, res, next) => {
    const username = String(req.query.username)
    pool.query(`SELECT * FROM posts
                WHERE author = $1`,
      [ username ], (q_err, q_res) => {
      res.json(q_res.rows)
    });
  });
  
export default router