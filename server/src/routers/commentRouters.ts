import express from "express";
import { pool } from "../db";

const router = express.Router();


router.post('/post/commenttodb', (req, res, next) => {
    const values = [ req.body.comment, 
      req.body.user_id, 
      req.body.username, 
      req.body.post_id]
  
    pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  router.put('/put/commenttodb', (req, res, next) => {
    const values = [ req.body.comment,
                     req.body.user_id, 
                     req.body.post_id, 
                     req.body.username, 
                     req.body.cid]
  
    pool.query(`UPDATE comments SET comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW()
                WHERE cid=$5`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  
  router.delete('/delete/comment', (req, res, next) => {
    const cid = req.body.comment_id
    console.log(cid)
    pool.query(`DELETE FROM comments
                WHERE cid=$1`, [ cid ],
                (q_err, q_res ) => {
                    res.json(q_res)
                    console.log(q_err)
        })
  })
  
  
  router.get('/get/allpostcomments', (req, res, next) => {
    const post_id = String(req.query.post_id)
    pool.query(`SELECT * FROM comments
                WHERE post_id=$1`, [ post_id ],
                (q_err, q_res ) => {
                    res.json(q_res.rows)
        })
  })

  export default router