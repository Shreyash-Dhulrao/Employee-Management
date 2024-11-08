import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signUp } from '../../firebase/Firebase'

const Signup = () => {
  const [Email, setEmail] = useState("")
  const [FName, setFName] = useState("")
  const [LName, setLName] = useState("")
  const [Password, setPassword] = useState("")
  const [Eye, setEye] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(FName, LName,  Email, Password)
  }
  return (
    <div className='flex flex-col items-center justify-center font-quicksand mt-10'>
      <h2 className="text-2xl font-bold mb-4 text-center">Signup Form</h2>
      <div className="w-1/2 bg-white rounded-lg shadow-md p-6 ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className='flex gap-3'>
          <input type="text" value={FName} onChange={(e) => setFName(e.currentTarget.value)} className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="First Name" />
          <input type="text" value={LName} onChange={(e) => setLName(e.currentTarget.value)} className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Last Name" />
          
          </div>
          <input type="email" value={Email} onChange={(e) => setEmail(e.currentTarget.value)} className="w-full  border-b-2  border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Company Email" />
          <div className='flex relative w-full '>
            <input type={Eye ? "text" : "password"} current-password="password" value={Password} onChange={(e) => setPassword(e.currentTarget.value)} className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Password" />
            <button className='absolute right-0 p-2.5' type='button' onClick={() => setEye(!Eye)}>
              {Eye ? <i className="fas fa-eye  currentcolor"></i> : <i className="fas fa-eye-slash currentcolor"></i>}
            </button>
          </div>
          <button type="submit" className="bg-zinc-200 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150">Sign up</button>
        </form>
        <div className='flex pt-3 justify-center'>
          <p>Already have an Account: <Link className="text-sm font-medium text-blue-500  no-underline" to='/'>Login</Link></p>
        </div>
      </div>

    </div>
  )
}

export default Signup
