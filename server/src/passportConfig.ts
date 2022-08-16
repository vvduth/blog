
import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';

import { pool } from './dbConfig'
const LocalStrategy = require("passport-local").Strategy;

export function initializePassport(passport:PassportStatic) {

    const authenticateUser = (email: any, password: string, done: any) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email, (err: any, results: any) => {
                if (err) {
                    throw err
                } 
                console.log(results.rows)

                if (results.rows.length > 0) {
                    const user = results.rows[0] ;
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            throw err 
                        } else if (isMatch ) {
                            return done(null, user) // return user and store in the cookies
                        } else {
                            return done(null, false, {message: "Wrong password please try again"})
                        }
                    })
                } else {
                    return done(null, false, "User is not exised, try to sign up please")
                }
                
            }]
        )
    };
    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passwordFiels: "password" 
        },
        authenticateUser
        )
    )
    passport.serializeUser((user:any, done:any) => done(null, user.id)) ;
    passport.deserializeUser((id:any, doner: any) => {
        pool.query(`SELECT * FROM users WHERE id = $1`,[id],(err,result) => {
            if (err) {
                throw err
            }
            return doner(null, result.rows[0])
        })
    })
}