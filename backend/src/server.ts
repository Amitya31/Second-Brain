import express from 'express'
const app = express()
import connectDB from './config/db'
import cors from 'cors'

app.use(express.json())

const origin = "http://localhost:5173"; // your frontend's URL

app.use(cors({
    origin,                
    credentials: true,     
  })
);

app.post('api/v1/auth/signin',(req,res)=>{
})

app.post('api/v1/auth/signin',(req,res)=>{
})

app.get('api/v1/content',(req,res)=>{

})

app.post('api/v1/brain/share',(req,res)=>{

})
app.post('api/v1/brain/:sharelink',(req,res)=>{

})


connectDB()



import UserRouter from './routes/user.route'
import ContentRouter from './routes/content.route'
import LinkRouter from './routes/link.route'
app.use('/api/v1',UserRouter)
app.use('/api/v1', ContentRouter)
app.use('/api/v1', LinkRouter)
app.listen(3000,()=>{
    console.log('app is listening')
});

