import express, { Request,Response } from 'express'
const app = express()
import connectDB from './config/db'
const cookieParser = require('cookie-parser')
import cors, { CorsOptions } from 'cors'

app.use(express.json())

const allowedOrigins = ["http://localhost:5173"]; // frontend URL

const corsOptions: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};

app.use(cors(corsOptions));

app.use(cookieParser())

connectDB()

import UserRouter from './routes/user.route'
import ContentRouter from './routes/content.route'
import LinkRouter from './routes/link.route'

app.get('/health', (req:Request, res:Response) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV 
    });
});

app.use('/api/v1',UserRouter)
app.use('/api/v1', ContentRouter)
app.use('/api/v1', LinkRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
});

