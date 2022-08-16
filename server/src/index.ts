import bcrypt from "bcryptjs";
import session from "express-session";
import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import passport from "passport";
import logger from "morgan";
import { initializePassport } from "./passportConfig";
import path from "path";
import { json } from "body-parser";
import { pool } from "./dbConfig";



const app = express();

initializePassport(passport)
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));

app.use(json());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize())
app.use(passport.session())

app.get("/", (_req: Request, res: Response) => {
  res.send("<p>Hello and welcome</p>");
});

app.post("/api/users/login", passport.authenticate('local'));

app.post("/api/users/register", async (req: Request, res: Response) => {
  let { username, email, password } = req.body;

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
                `INSERT INTO users (username, email, password)
                VALUES ($1,$2,$3)`,
                [username, email, hasedPasword],
                (err, result) => {
                  if (err) {
                    throw err;
                  }
                  console.log(result.rows) ;
                  res.json({
                    message: "successfully registered",
                    username,
                    email,
                    password: hasedPasword
                  })
                }
              );
        }
      }
    );
  }
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening to port ${PORT}`);
});
