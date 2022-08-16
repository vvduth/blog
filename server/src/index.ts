import  cookieParser  from 'cookie-parser';
import express , {Request, Response, NextFunction}from 'express'
import logger from 'morgan'
import path from 'path'
import {json} from 'body-parser'


const app = express()  ;

app.use(logger('dev')) ;

app.use(json()) ;

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (_req: Request, res: Response) => {
    res.send('<p>Hello and welcome</p>')
})

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});