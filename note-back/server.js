import http from 'http'
import express from 'express'
import cors from 'cors'
import { noteRoutes } from './routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*')
    res.setHeader(
        'Access-Controll-Allow-Headers',
        'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization'
    )
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST, PUT, DELETE')
    next()
})

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Server is working !',
    })
})

app.use('/note', noteRoutes)

const server = http.createServer(app)

// ON LOCALHOST
server.listen(process.env.SERVER_PORT, () => console.log(process.env.CONNECTED))

// ON SERVER
// server.listen();

export default server
