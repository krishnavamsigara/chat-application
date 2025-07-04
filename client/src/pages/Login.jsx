import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const [currstate,setCurrstate] = useState("Sign up")
  const [fullName,setFullName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [bio,setBio] = useState("")
  const [isdata,setIsdata] = useState(false)

  const {login} = useContext(AuthContext)

  const onSubmitHandler =  (e) =>{
    e.preventDefault()
    if(currstate === 'Sign up' && !isdata){
      setIsdata(true)
      return;
    }
    login(currstate === "Sign up" ? 'signup' : 'login',{fullName,email,password,bio})
    

  }

  return (
    <div className='min-h-screen bg-cover flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      <img src={assets.logo_big} alt="" className='w-[30vw,250px]' />
     <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
     <h2 className='font-medium text-2xl flex justify-between items-center'>{currstate} {isdata &&  <img onClick={()=>setIsdata(false)}  src={assets.arrow_icon} alt="" className='w-5 cursor-pointer' />}</h2>
     {currstate === "Sign up" && !isdata &&(<input onChange={(e)=>setFullName(e.target.value)} placeholder=' Enter Fullname' type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none' required />)}
     {!isdata && (
      <>
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email"  placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password"  placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
      </>
     )}
     
     {
      currstate === 'Sign up' && isdata &&(
        <textarea rows={4}  onChange={(e)=>setBio(e.target.value)} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a sort bio ...'>

        </textarea>
      )
     }
     <button className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
      {currstate === 'Sign up' ? "Create Account " : "Login Now"}
     </button>
     <div className='flex items-center gap-2 text-sm text-gray-500'>
      <input type="checkbox" />
      <p>Agree to the terms of use & privacy policy</p>
     </div>
     <div className='flex flex-col gap-2'>
      {currstate === 'Sign up' ? (<p className='text-sm text-gray-600'>Already have an account? <span onClick={()=>{setCurrstate("Login");setIsdata(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>) : (<p className='text-sm text-gray-600'>Create an account <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>setCurrstate('Sign up')}>Click here</span></p>)}

     </div>


     </form>

    </div>
  )
}

export default Login