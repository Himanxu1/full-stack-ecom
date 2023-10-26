import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const backend_url = process.env.REACT_APP_BACKEND_URI;
const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()


    const handleSignin = () =>{
        axios.post(`${backend_url}api/auth/login`,{email,password}).then((res)=>{
            toast('🦄 login Success!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            localStorage.setItem('token',res.data.token)    
            navigate("/home")

         }).catch((err)=>{
            console.log(err)
         })

    }


  return (
    <div className='flex justify-center pt-20 bg-black w-full h-[87.9vh]'>
    <div className="w-full max-w-xs ">
<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e)=>e.preventDefault()}>
<div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
    Email
  </label>
  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
</div>
<div className="mb-6">
  <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
    Password
  </label>
  <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"  onChange={(e)=>setPassword(e.target.value)} />
 
</div>
<div >
  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSignin}>
    Sign In
  </button>
</div>
</form>
</div>
</div>
  )
}

export default Login