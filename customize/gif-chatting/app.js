import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import session from 'express-session'
import flash from 'connect-flash'
import ColorHash from 'color-hash'
import dotenv from 'dotenv'

dotenv.config()

import webSocket from './socket'
import indexRouter from './routes'
import connect from './schemas'

const app = express()
connect()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 8005)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/gif', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
const sessionMiddleware = session({
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
})

app.use(sessionMiddleware)
app.use(flash())

app.use((req,res,next)=>{
    if(!req.session.color){
        const colorHash = new ColorHash()
        req.session.color = colorHash.hex(req.sessionID)
    }
    next()
})

app.use('/', indexRouter)


app.use((req,res,next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err,req,res,next)=>{
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err: {}
    res.status(err.status || 500)
    res.render('error')
})

const server = app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), ' port is listening')
})


webSocket(server, app, sessionMiddleware)