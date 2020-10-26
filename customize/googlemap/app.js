import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'

dotenv.config()

import index from './routes'
import connect from './schemas'

const app = express()
connect()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 8001) // 배포하는 서버에서 이 포트를 활용할 수 있는 장점이 있다.

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public'))) // CSS setting
app.use(express.json())
app.use(express.urlencoded({extended:false})) 
// 종종 express.urlencoded 대신, bodyParser.urlencoded로 사용하는 경우도 있는데, 
// 구버전에선 이렇게 사용하지만, 신버전에서는 express로 통합되었다.

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}))

app.use(flash())

app.use('/', index)

app.use((req,res,next)=>{
    const err = new Error('Not Found!')
    err.status = 404;
    next(err)
})

app.use((err,req,res,next)=>{
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === "development" ? err: {};
    res.status(err.status || 500)
    res.render('error')
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), ' is running')
})