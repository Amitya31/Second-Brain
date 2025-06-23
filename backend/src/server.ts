import express from 'express'
const app = express()
import connectDB from './config/db'
import cors from 'cors'

app.use(express.json())
app.use(cors())

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
app.use('/api/v1',UserRouter)
app.use('/api/v1', ContentRouter)
app.listen(3000,()=>{
    console.log('app is listening')
});

