import axios from 'axios'
import {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from "../Hooks/useAuth";


interface formDataprops {
    username:string,
    email:string,
    password:string
}

interface loginFormDataprops {
    email:string,
    password:string
}


export default function Auth() {
    const {login}=useAuth()
    const navigate = useNavigate()
    const [activeTab,setActiveTab] = useState<'login'|'signup'>('login')
    const [formData,setFormData] = useState<formDataprops>({username:'',email:'',password:''})
    const [loginFormData,setLoginFormData] = useState<loginFormDataprops>({email:"",password:""})
    const [showPassword,setShowPassword] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value} = e.target
        setFormData(prev=> ({...prev ,[name]:value}))
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>):void=>{
        const {name,value} = e.target
        setLoginFormData(prev=> ({...prev ,[name]:value}))
    }

    const handleTabChange=()=>{
        if(activeTab==='signup'){
            setActiveTab('login')
        }
        if(activeTab==='login'){
            setActiveTab('signup')
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(formData)
        Authuser()
    }

    const Authuser = async ()=>{
        try{
            const endpoint = activeTab==='signup'? 'http://localhost:3000/api/v1/user/register' : 'http://localhost:3000/api/v1/user/login'
            const formdata = activeTab==='signup' ? formData : loginFormData
            const response = await axios.post(endpoint, formdata, {
                withCredentials: true,  // browser can only access cookies if it is set true
            })
            const data = response.data
            const token = data.token
            const isSignupSuccess = activeTab==='signup' && response.data.success;

            const isSigninSuccess = activeTab==='login' && response.data.success;

            if(isSignupSuccess || isSigninSuccess){
                const successMessage = activeTab==='signup'?
                'Succesfuly signed':
                'Successfully logedin'

                alert(successMessage)
                if(token){
                    login(token)
                    navigate('/')
                }
            }     
        }catch(e){
            if(e instanceof Error){
            console.log(e.message)
            return
            }
        }
    }


    
  return (
    <div className='min-h-screen bg-black w-full lg:flex'>
        <div className='lg:w-3/5 flex items-center justify-center'>
        <div className=" mx-auto px-10 mb-10 lg:mb-0">
         <div className='ml-7 text-white/45 text-6xl p-3 rounded-4xl font-semibold'>
            Welcome to Punk Records
         </div>
         <div className=''></div>
        </div>
        </div>
        <div className='flex items-center justify-center py-6'>
            <div className='bg-gray-600 backdrop-blur-sm text-white/60 w-full p-6 text-2xl rounded-lg m-2 lg:m-0'>
              <Tabs defaultValue='signup' value={activeTab} onValueChange={handleTabChange} className='w-full h-full'>
                <TabsList className=' rounded-4xl bg-gray-700 backdrop-blur-5xl p-1'>
                    <TabsTrigger value='login' className='px-10 lg:px-19 m-1 ml-3 data-[state=active]:bg-black  data-[state=active]:rounded-2xl '>
                        Login
                    </TabsTrigger>
                    <TabsTrigger value='signup' className='px-10 lg:px-19 m-1 ml-5 data-[state=active]:bg-black  data-[state=active]:rounded-2xl '>
                        Signup
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='login' >
                  <Card>
                    <CardHeader>
                       <div>
                        <div className='my-5 font-semibold text-3xl bg-linear-360 from-black to-gray-200 bg-clip-text flex items-center justify-center'>
                          <div>Welcome Back</div>
                        </div>
                        <div className='text-shadow-white'>Login to visit your site now to Explore more</div>
                       </div>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className='my-3 w-full text-white flex flex-col'>
                                <label htmlFor='email'>Email</label>
                                <input 
                                placeholder='Enter email'
                                name='email'
                                onChange={handleLoginChange}
                                value={loginFormData.email}
                                className='border-gray-300 h-10 focus:border-gray-300  rounded-lg'
                                required
                                />
                            </div>
                            <div>
                                <div className='my-3 w-full text-white flex flex-col'>
                                <label htmlFor='password'>Password</label>
                                <div className='flex'>
                                <input 
                                placeholder='Enter password'
                                type={showPassword ? 'text':'password'}
                                name='password'
                                onChange={handleLoginChange}
                                value={loginFormData.password}
                                className='border-gray-300 h-10 focus:border-none
                                00 w-full  rounded-lg'
                                required
                                />
                                <button className='text-white/20' onClick={()=>setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                                </div>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className='w-full flex justify-center'>
                                <button className='p-1 rounded-md w-45 bg-black hover:bg-gray-700 cursor-pointer' type='submit'>
                                    Login
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value='signup' >
                  <Card>
                    <CardHeader>
                       <div>
                        <div className='my-5 font-semibold text-3xl bg-linear-360 from-black to-gray-200 bg-clip-text flex items-center justify-center'>
                          <div>Create Account</div>
                        </div>
                        <div className='text-shadow-white'>Login to visit your site now to Explore more</div>
                       </div>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
                            <div className='my-3 w-full text-white flex flex-col'>
                                <label htmlFor='username'>Username</label>
                                <input 
                                placeholder='Enter Username'
                                name='username'
                                onChange={handleChange}
                                type='text'
                                value={formData.username}
                                className='border-gray-300 h-10 focus:border-gray-3
                                00  rounded-lg'
                                required
                                />
                            </div>
                            <div className='my-3 w-full text-white flex flex-col'>
                                <label htmlFor='email'>Email</label>
                                <input 
                                placeholder='Enter email'
                                name='email'
                                onChange={handleChange}
                                value={formData.email}
                                className='border-gray-300 h-10 focus:border-gray-3
                                00  rounded-lg'
                                required
                                />
                            </div>
                            <div>
                                <div className='my-3 w-full text-white flex flex-col'>
                                <label htmlFor='password'>Password</label>
                                <input 
                                placeholder='Enter password'
                                type={showPassword ? 'text':'password'}
                                name='password'
                                onChange={handleChange}
                                value={formData.password}
                                className='border-gray-300 h-10 focus:border-gray-3
                                00  rounded-lg'
                                required
                                />
                                <button className='text-white/20' onClick={()=>setShowPassword(!showPassword)}>
                                    {showPassword ? <Eye /> : <EyeOff />}
                                </button>
                            </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className='w-full flex justify-center'>
                                <button className=' p-1 rounded-md w-45 bg-black hover:bg-gray-700 cursor-pointer' type='submit'>
                                    Create Account
                                </button>
                            </div>
                        </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
        </div>
    </div>
  )
}
