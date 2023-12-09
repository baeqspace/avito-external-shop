import express from "express"
import cors from 'cors'
import AuthRouter from "./routers/AuthRouter.js"
import UserRouter from './routers/UserRouter.js'
import AvitoRouter from './routers/AvitoRouter.js'
import cookieParser from "cookie-parser"
import 'dotenv/config'

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


app.listen(PORT, () => {
    console.log('server started on port ' + PORT, 'with frontend on ' + process.env.FRONTEND)
})