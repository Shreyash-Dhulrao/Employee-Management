import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signIn } from '../../firebase/Firebase'
import { auth } from '../../firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'


const Login = () => {
  const [Eye, setEye] = useState(false)
  const [user, setUser] = useState(null)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [newState, setnewState] = useState(false)
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
          navigate(lastPage);
        } else {
          navigate("/homepage");
        }
      } else {
        setUser(null);
        navigate('/');
      }
      localStorage.removeItem('lastPage');
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('lastPage', location.pathname); // Save current page
    }
  }, [location, user]);

  const stateCheck = (e) => {
    e.preventDefault()
    const val = e.currentTarget.value
    if (val === "admin") {
      setnewState(true)
    }
    else {
      setnewState(false)
    }
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    if(newState === true) {
      console.log(newState)
      signIn(Email, Password)
    }
    else{
      console.log(newState)

      const a = {
        email: Email,
        pas : Password
      }
      console.log( a)
    }
  }
  return (
    <div>
      <div className='w-full text-black py-5 justify-center flex gap-10 font-noto font-semibold'>
        <button onClick={stateCheck} value="admin" className='border-b-2 px-5 py-2 hover:border-blue-500 focus:border-blue-500 text-zinc-500 border-transparent md:text-xl text-lg focus:text-blue-500'>Admin</button>
        <button onClick={stateCheck} value="employee" className='border-b-2 px-5 py-2 hover:border-blue-500 focus:border-blue-500 text-zinc-500 border-transparent md:text-xl text-lg focus:text-blue-500'>Employee</button>
      </div>
      <div >
        {newState ? (
          <div className="flex flex-col  items-center justify-center font-noto tracking-wide ">
            <div className="w-full max-w-md bg-white   rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sign In as Admin</h2>
              <form className="flex flex-col" onSubmit={handleSubmit} >
                <input type="email"  value={Email} onChange={(e)=>setEmail(e.currentTarget.value)} className="  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Email address" />
                <div className='flex relative w-full '>
                <input type={Eye? "text" : "password"} value={Password} onChange={(e)=> setPassword(e.currentTarget.value)}  autoComplete="current-password" className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Password" />
                <button className='absolute right-0 p-2.5' type='button' onClick={()=>setEye(!Eye)}>
                {Eye ?  <i className="fas fa-eye-slash currentcolor"></i> : <i className="fas fa-eye  currentcolor"></i> }
                </button>
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <label htmlFor="remember-me" className="text-sm cursor-pointer">
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-500  no-underline">Forgot password?</a>
                </div>
                <button type="submit" className="bg-zinc-200 hover:text-white hover:bg-blue-500  font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150">Login</button>
              </form>
              <div className='flex justify-center pt-4'>
                <p>New User ? <Link to="/signup" className="text-sm font-medium text-blue-500  no-underline">Create new Account</Link></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center font-noto tracking-wide ">
            <div className="w-full max-w-md bg-white   rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Sign In as Employee</h2>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <input type="email" value={Email} onChange={(e)=>setEmail(e.currentTarget.value)}   className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Email address" />
                <div className='flex relative w-full '>
                <input type={Eye? "text" : "password"} value={Password} onChange={(e)=> setPassword(e.currentTarget.value)}  autoComplete="current-password" className="w-full  border-b-2 border-zinc-400 outline-none p-2 mb-4 bg-transparent  transition ease-in-out duration-150 " placeholder="Password" />
                <button className='absolute right-0 p-2.5' type='button' onClick={()=>setEye(!Eye)}>
                {Eye ? <i className="fas fa-eye-slash currentcolor"></i> : <i className="fas fa-eye  currentcolor"></i> }
                </button>
                </div>
                <div className="flex items-center justify-between flex-wrap">
                  <label htmlFor="remember-me" className="text-sm cursor-pointer">
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    Remember me
                  </label>
                  <a href="#" className="text-sm font-medium text-blue-500  no-underline">Forgot password?</a>
                </div>
                <button type="submit" className="bg-zinc-200 hover:text-white hover:bg-blue-500  font-bold py-2 px-4 rounded-md mt-4 transition ease-in-out duration-150">Login</button>
              </form>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Login
