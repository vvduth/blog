import generateToken from "../utils/generateToken";
import { pool } from "../dbConfig";
import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";


export interface getProfileRequest extends Request {
  user?: any
}
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    let { username, email, password } = req.body;
    
    let role = false;

    let errors: any = [];
    if (!username || !email || !password) {
      errors.push({ messeage: "Please fill all the fields in the right way" });
    }

    if (password.length < 5) {
      errors.push({ message: "passwordshould be at least 6 characters" });
    }

    if (errors.length > 0) {
      res.status(404);
      throw new Error("Invalid information please check again");
    } else {
      let hasedPasword = await bcrypt.hash(password, 10);
      pool.query(
        `
                  SELECT * FROM users WHERE email = $1`,
        [email],
        (err, result) => {
          if (err) {
            throw err;
          }

          if (result.rows.length > 0) {
            errors.push({ message: "user already existed" });
            res.json({ errors: errors });
          } else {
            
            pool.query(
              `INSERT INTO users (username, email, password, role)
                  VALUES ($1,$2,$3,$4) RETURNING uid`,
              [username, email, hasedPasword, role],
              (err, result) => {
                if (err) {
                  throw err;
                }
                //console.log(result);
                let token = generateToken(result.rows[0].uid)
                res.status(201).json({
                  message: "successfully registered",
                  username,
                  email,
                  password: hasedPasword,
                  token,
                  role,
                });
              }
            );
          }
        }
      );
    }
  }
);


export const authUser = asyncHandler(async(req: Request, res: Response) => {
    const {email , password} = req.body;
    
    pool.query(
        `
                  SELECT * FROM users WHERE email = $1`,
        [email],
        async (err, result) => {
          if (err) {
            throw err;
          }

          if (result.rows.length > 0) {
            const validPassword = await bcrypt.compare(password, result.rows[0].password)

            if (validPassword) {
                res.json({
                    id: result.rows[0].uid,
                    username: result.rows[0].username,
                    email: result.rows[0].email,
                    role: result.rows[0].role,
                    token: generateToken(result.rows[0].uid),
                })
            } else {
                res.status(401)
                throw new Error('Invalid email or password')
            }
            
          } else {
            res.status(401)
            throw new Error("Invalid email, try again or creat new account")
          }
        }
    )
})

export const getUserProfile  = asyncHandler(async(req: getProfileRequest, res: Response) => {

  
  pool.query(
    `SELECT uid, username, email, role FROM  users WHERE uid=$1`,
    [req.user.uid],
    async (err, result) => {
      if (err) {
        throw err;
      }
      if (result) {
        res.status(200).json({
          id: result.rows[0].uid,
          username: result.rows[0].username,
          email: result.rows[0].email,
          role: result.rows[0].role
        })
      } else {
        res.status(404)
        throw new Error('User not found ')
      }

    }
  );
})