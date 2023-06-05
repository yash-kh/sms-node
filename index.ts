import express, { Express } from 'express'
import dotenv from 'dotenv'
import upload from 'express-fileupload'
import file from './routes/file'
import authentication from './middleware/authentication'

// loading env file
dotenv.config()

const app : Express = express()
let port : number = NaN

// testing env variables
if(process.env.PORT === undefined || process.env.SECRET === undefined) {
    throw Error("env variable missing")
} else{
    port = parseInt(process.env.PORT)
}

// static images
app.use('/image', express.static('uploads'));

// middlewares
app.use(upload())
app.use(express.json())
app.use(authentication)

// routes
app.use('/file', file)

// starting app
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
