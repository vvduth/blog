import express , {Request, Response, NextFunction}from 'express'
import { json } from 'body-parser'
import path from 'path';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import postRouter from './routers/postRouters'
import commentRouter from './routers/commentRouters'
import userRouter from './routers/userRouters'
const app = express() 
app.use(logger('dev'));

app.use(json()) ;
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/post', postRouter)
app.use('/api/comment',commentRouter) 
app.use('/api/user', userRouter)

app.get('/', (_req: Request, res: Response) => {
    res.send('<p>Hello and welcome</p>')
})


const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});