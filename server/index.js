import express from "express"
import cors from 'cors'
import AuthRouter from "./routers/AuthRouter.js"
import UserRouter from './routers/UserRouter.js'
import AvitoRouter from './routers/AvitoRouter.js'
import cookieParser from "cookie-parser"
import 'dotenv/config'
import path from "path"

const app = express()
const PORT = 3000

app.use(cors({
    credentials: true,
    origin: [process.env.FRONTEND]
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api-aes', AuthRouter)
app.use('/api-aes', UserRouter)
app.use('/api-aes', AvitoRouter)
app.use('/baeq-aes', express.static('../client/dist'))

app.get('/baeq-aes/*', (req, res) => {
    res.sendFile(path.join(path.resolve(), '../client/dist'))
})


app.listen(PORT, () => {
    console.log('server started on port ' + PORT, 'with frontend on ' + process.env.FRONTEND)
})