import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface formDataprops {
    username:string,
    email:string,
    password:string
}

export default function Auth() {
    const navigate = useNavigate()
    const [activeTab,setActiveTab] = useState<'login'|'signup'>('login')
    const [formData,setFormData] = useState<formDataprops>({username:'',email:'',password:''})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value} = e.target
        setFormData(prev=> ({...prev ,[name]:value}))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault()
        console.log(formData)
        Authuser()
        navigate('/home')
    }

    const Authuser = async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/register', formData, {
                withCredentials: true,  // browser can only access cookies if it is set true
            })
            const data = response.data
            const token = data.token

            if(token){
                localStorage.setItem('token',token)
            }
        }catch(e){
            if(e instanceof Error){
            console.log(e.message)
            return
            }
        }
    }


    
  return (
    <div className='h-screen w-screen bg-black flex text-gray-400'>
        <div>
           <form onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input
              className='bg-gray-400 text-white'
              name='email'
              type='email'
              placeholder='enter your email'
              onChange={handleChange}
            />
            <label htmlFor='password'>password</label>
            <input
              className='bg-gray-400 text-white'
              name='password'
              type='password'
              placeholder='enter your password'
              onChange={handleChange}
            />
            <label htmlFor='username'>Username</label>
            <input
              className='bg-gray-400 text-white'
              name='username'
              type='text'
              placeholder='enter your username'
              onChange={handleChange}
            />
            <button type='submit' >
                Submit
            </button>
        </form> 
        </div>
    </div>
  )
}
