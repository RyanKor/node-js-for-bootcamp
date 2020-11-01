/*
지금 보고 있는 책의 코드들이 업데이트가 안되어 있는 구버전이더라도 

이리 뜯어보고, 저리 뜯어보면서 Modern JS에 맞게 작업해보는 과정은 스스로 학습 경험을 넓히는데 많은 도움이 된다.uk-table-cursor-pointer

*/

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import morgan from 'morgan'
import session from 'express-session'
import flash from 'connect-flash'
import dotenv from 'dotenv'

dotenv.config()

import {sequelize} from './models'
import passportConfig from './passport'

import authRouter from './routes/auth'
import indexRouter from './routes/index'
import v1 from './routes/v1'
import v2 from './routes/v2'

const app = express()
sequelize.sync()
passportConfig(passport)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('port', process.env.PORT || 8002)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}))

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRouter)
app.use('/v1', v1)
app.use('/v2', v2)
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

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), ' port is listening')
})